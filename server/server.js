import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import swagger from 'express-swagger-generator';
import log4js from 'log4js';

import config from './config.js';
import newsRoutes from './routes/news.js';

const app = express();
const __dirname = path.resolve();

log4js.configure(config.log4js);
app.use(log4js.connectLogger(log4js.getLogger(), config.express));
app.use(cors());
app.use(bodyParser.json()); // parse application/json
app.use(express.static(path.join(__dirname, '../dist')));

newsRoutes.register(app);

swagger(app)(config.swagger);

app.listen(process.env.PORT || 8080);
