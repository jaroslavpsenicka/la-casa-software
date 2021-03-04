import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { create, all } from 'mathjs'
import { adapt } from "webcomponents-in-react"

import { RequestsContext } from '../RequestsContext';

import Loading from '../components/Loading'
import LoadingError from '../components/LoadingError'

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';

const math = create(all, {});
math.import({
  isEmpty: (value) => !value || value === '',
  isNotEmpty: (value) => value && value !== '',
  isNotEmptyObject: (value) => value && Object.keys(value).length > 0,
  collectionSize: (value) => value ? value.length : 0,
  collectionSubset: (value) => value
});

const RequestDetailPage = ({ requestId }) => {

  const [ requests ] = useContext(RequestsContext);
  const [ request, setRequest ] = useState({ loading: true });
  const [ overview, setOverview ] = useState({ loading: false });
  const [ attributes, setAttributes ] = useState();

  const setRequestAndLoadOverview = (response) => {
    setRequest({ loading: false, data: response.data });
    setAttributes(response.data.attributes.reduce((a, b) => (a[b.name] = b, a), {}));
    setOverview({ loading: true });
    Axios.get(SERVICE_URL + '/api/requests/' + response.data.caseType)
      .then(response => setOverview({ loading: false, data: response.data }))
      .catch(err => setOverview({ loading: false, error: err }));
  }

  const isVisible = (field) => {    
    return math.eval(field.visible, attributes);
  }

  useEffect(() => {    
    Axios.get(SERVICE_URL + '/api/requests/' + requestId)
      .then(response => setRequestAndLoadOverview(response))
      .catch(err => setRequest({ loading: false, error: err }));
  }, [requests.data]);

  const Request = () => (
    <>
      <h4 className="text-muted font-weight-light text-uppercase mb-4">REQUESTS / {request.data.label}</h4>
      <div className="text-primary">{ request.presentationSubject }</div>
      <div className="text-secondary mt-4">Here comes the case (request) detail.<br/>
        This is mostly read-only screen displaying summary of the request, i.e. parameters specified by the user. You may
        often influent the request processing, for example cancel or escalate the request from here -- these options 
        depend on the case design and may vary.
      </div>
      { overview.data.activities.map(a => <Activity key={a.name} activity={a}/>) }
    </>
  )

  const Activity = ({ activity }) => (
    <>
      <h5 className="mt-4 mb-4">{activity.label}</h5>
      { activity.fields.map(f => <Field key={f.name} field={f}/>) }
    </>
  )

  const Field = ({ field }) => {
    const FieldTag = adapt(field.editor.name);
    const valueAttrName = field.selector.attributes.value ? field.selector.attributes.value.name : undefined;
    return <FieldTag 
      name = { field.name } 
      label = { field.label } 
      visible = { math.eval(field.visible, attributes) } 
      editable = { math.eval(field.editable, attributes) } 
      myField = { field }
      myValue = { valueAttrName ? attributes[valueAttrName] : undefined } 
    />
  }

  return (
    <div>
      {
        request.loading || overview.loading ? <Loading /> : 
        request.data && overview.data ? <Request /> :
        <LoadingError error={requests.error} /> 
      }
    </div>  
  );
};

export default RequestDetailPage;
