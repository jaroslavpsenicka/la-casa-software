import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { NewsContext } from '../NewsContext';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Loading from '../components/Loading';
import Updating from '../components/Updating';
import LoadingError from '../components/LoadingError';
import RecordDialog from '../components/RecordDialog';

const NewsPage = () => {

  const { news, setSort, loadNextPage, saveRecord } = useContext(NewsContext);
  const [ showEditialog, setShowEditDialog ] = useState(false);
  const [ toggled, setToggled ] = useState({});
  const [ updating, setUpdating ] = useState({});
  const [ filter, setFilter ] = useState('');

  const saveRecordAndCloseDialog = (record) => {
    setShowEditDialog(false);
    setUpdating(prev => { return {...prev, [record.Id]: true }});
    saveRecord(record)
      .catch(err => console.log('error updating record', record.Id, err))
      .finally(() => setUpdating(prev => { return {...prev, [record.Id]: false }}))
  }

  const NoNews = () => (
    <div className="mt-5 text-center text-secondary">There are no news, is it good or bad these days?</div>
  )

  const SearchAndOrdering = () => (
    <div className="mt-5 mb-5 offset-sm-2">
      <InputGroup size="md" className="mb-3">
        <FormControl placeholder="type to filter,  &#9166;  to search" aria-label="search" className="col-sm-6"
          value={filter} onChange={(event) => setFilter(event.target.value)}/>
        <FormControl as="select" className="col-sm-4" onChange={(event) => setSort(event.target.value)}>
          <option value="Time">sort by time</option>
          <option value="Headlines">sort by headlines</option>
        </FormControl>
      </InputGroup>
    </div>
  )

  const News = ({ data }) => (
    <Container>
      { 
        data.filter(r => filter === '' || r.Headlines.includes(filter))
          .filter(r => r && r.Id)
          .map(r => updating[r.Id] ? <Updating key={r.Id} /> : <RecordRow record={r} key={r.Id} />) 
      }
      <Row className="mt-3">
        <div className="col-sm-12 pr-0">
          <Button className="btn-default float-right" onClick={() => loadNextPage()}>Next Page</Button>
        </div>
      </Row>
    </Container>
  )
  
  const RecordRow = ({ record }) => {
    return (
      <Row className="p-2 pl-3 mb-1 bg-white text-secondary">
        <div className="mb-0 text-primary col-sm-9 cursor-pointer" 
          onClick={() => setToggled({ ...toggled, [record.Id]: !toggled[record.Id]})}>
          <FontAwesomeIcon icon={toggled[record.Id] ? faAngleDown : faAngleRight} />
          <span className="ml-3">{record.Headlines}</span>
        </div>
        <div className="text-secondary col-sm-3 text-right">{new Date(record.Time).toLocaleString()}</div>
        { toggled[record.Id] ? <RecordDetail record={record} /> : null }
      </Row>
    )
  }

  const RecordDetail = ({ record }) => (
    <div className="text-secondary mt-2 col-sm-12">
      <Button className="float-right ml-2 mb-2" onClick={() => setShowEditDialog(true)}>Edit Record</Button>
      <span>{record.Description}</span>
      <RecordDialog 
        show={showEditialog} 
        record={record} 
        onSubmit={(values) => saveRecordAndCloseDialog(values)} 
        onCancel={() => setShowEditDialog(false)} />
    </div>
  )

  return (
    <>
      <SearchAndOrdering />
      { news.data && news.data.length > 0 && <News data={news.data} /> }
      { news.data && news.data.length == 0 && <NoNews /> }
      { news.loading && <Loading /> } 
      { news.error && <LoadingError error = { news.error }/> }    
    </>  
  )
};

export default NewsPage;
