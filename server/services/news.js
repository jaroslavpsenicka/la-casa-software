import fs from 'fs';
import path from 'path';
import log4js from 'log4js';
import csv from '@fast-csv/parse';
import format from '@fast-csv/format';
import moment from 'moment-timezone';
import sanitizeHtml from 'sanitize-html';

import { sort } from './functions.js';
import config from '../config.js';

const DIR = path.resolve();
const LOGGER = log4js.getLogger('news-service');
const DATASET = path.resolve(DIR, 'data', 'dataset.csv');
const DATE_FMT = "h:mm  A z ddd, D MMMM YYYY";
const VALIDATION_COLUMNS = ['Time', 'Headlines'];
const INDEX_COLUMNS = ['Time', 'Headlines'];

const data = [];
const indexes = {};

var watcher;

const readData = (dataset) => {
  var idCounter = 0;
  var errCounter = 0;
  LOGGER.info('loading', dataset);
  fs.createReadStream(dataset)
    .pipe(csv.parse(config.csv.options))
    .validate(row => {
      return ! VALIDATION_COLUMNS.find(key => row[key].length == 0)})
    .transform(row => { 
      return { ...row, Id: idCounter++ }})
    .on('error', error => LOGGER.error(error))
    .on('data-invalid', () => errCounter++)
    .on('data', row => data.push({ ...row, 'Time': moment.tz(row.Time, DATE_FMT, 'Europe/Prague') }))
    .on('end', rowCount => {
      LOGGER.info('loaded', rowCount, 'rows,', errCounter, 'rows ignored');
      createIndexes(data);
      startWatcher(dataset);
    });
}

const createIndexes = (data) => {
  LOGGER.info('creating indexes', INDEX_COLUMNS);
  INDEX_COLUMNS.forEach(key => {
    indexes[key] = createIndex(data, key);
  });
}

const createIndex = (data, name) => {
  const subset = data.map(row => { return { Id: row.Id, [name]: row[name] }})
  return sort(subset, name).map(row => { return row.Id });
}

const startWatcher = (dataset) => {
  LOGGER.info('watching', dataset);
  watcher = fs.watch(dataset, (event) => {
    if (event === 'change') {
      LOGGER.info(`dataset changed, reloading...`);
      readData(DATASET);
    }}
  )
}

readData(DATASET);

/**
 * Return news.
 * @param {*} page the page starting from 0 
 * @param {*} size the page size
 * @param {*} sortBy sort key, one of INDEX_COLUMNS
 */  
const find = (page, size, sortBy) => {
  return new Promise((resolve, reject) => {
    if (!INDEX_COLUMNS.includes(sortBy)) {
      reject('illegal sort key: ' + sortBy);
    }

    const start = page * size;
    const maxIdx = indexes[sortBy].length-1;
    const end = Math.min(start + size, maxIdx);
    if (page >=0 && size > 0 && start < maxIdx) {
      const ids = indexes[sortBy].slice(start, end);
      resolve(ids.map(idx => data[idx]));
    } else {
      reject('illegal query: ' + page + ', ' + size);
    }
  })
}

/**
 * Update record.
 * @param {*} id record id
 * @param {*} rec record data
 */
const findAndUpdate = (id, { Headlines, Description }) => {
  return new Promise((resolve, reject) => {
    if (!data[id]) {
      return reject('illegal id: ' + id);
    } else if (!Headlines || !Description) {
      return reject('bad request: ' + Headlines + ', ' + Description);
    }

    data[id] = {
      Id: id, 
      Time: moment(),
      Headlines: sanitizeHtml(Headlines),
      Description: sanitizeHtml(Description)
    };

    const transform = ({ Headlines, Time, Description }) => {
      return { Headlines, Time: Time.format(DATE_FMT), Description }
    };

    watcher.close();
    watcher = null;
    format.writeToPath(DATASET, data, { ...config.csv.options, transform })
      .on('error', (err) => reject(err))
      .on('finish', () => {
        LOGGER.info('data written', DATASET)
        createIndexes(data);
        startWatcher(DATASET);
        resolve(data[id]);
      })
  });
  
}

export default { find, findAndUpdate }