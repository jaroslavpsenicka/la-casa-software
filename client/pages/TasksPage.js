import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faHandPaper } from '@fortawesome/free-regular-svg-icons'
import styled from 'styled-components';
import { A } from 'hookrouter';
import vagueTime from 'vague-time';

import { RequestsContext } from '../RequestsContext';
import Loading from '../components/Loading'
import LoadingError from '../components/LoadingError'

import Search from '../components/Search';

const StyledRequestImage = styled(FontAwesomeIcon)`
  position: absolute;
  width: 32px;
  height: 32px;
  margin: 5px;
  color: #18BC9C;
`

const status = (code) => {
  return code === 'COMPLETED' ? 'Completed' :
    'ACTIVATED' ? 'In progress' :
    'Unknown';
}

const TasksPage = () => {

  const [ requests ] = useContext(RequestsContext);

  const RequestRow = ({ request }) => {
    const textClass = request.caseStatus === 'COMPLETED' ? 'text-secondary' : '';
    return (
      <div className="p-2 pl-3 mb-1 bg-white text-secondary">
        <div className="mr-5">
          <StyledRequestImage icon={faHandPaper} size="lg" className={textClass} />
          <h5 className="text-ellipsis pr-3 ml-5 mb-0 text-primary">
            <A href={`/requests/${request.cidla}`} className={textClass}>{request.label}</A>
          </h5>
          <div className="text-secondary ml-5">{request.presentationSubject}</div>
          <div className="text-secondary ml-5 mt-2"><strong>{status(request.caseStatus)}</strong>, 
            last update: <strong>{vagueTime.get({ to: request.modifiedAt })}</strong></div>
        </div>
      </div>
    )
  }

  const NoRequests = () => (
    <div className="text-secondary mt-4">No requests so far.</div>
  )

  const Requests = () => (
    <div className="col-md-6" >
      <h5>My Requests</h5>
      <div className="text-secondary mb-4">To issue a request, simply work with the case or have a chat with Kiki.
      In other words, there is no new-request button with zillion of types and options.</div>
      { 
        requests.loading ? <Loading /> :
        requests.error ? <LoadingError error={requests.error} /> :
        requests.data ? requests.data.map(r => <RequestRow request={r} key={r.cidla} />) : 
        <NoRequests />
      }
    </div>
  )

  const Tasks = () => (
    <div className="col-md-6" >
      <h5>My Tasks</h5>
      <div className="text-secondary mb-2">Here comes the list of tasks you are about to complete. The grey ones are
      still kind of OK, however, you better finish the yellow and red ones.</div>
      <img className="mx-auto d-block mt-4 w-50" src="/job-done.png"/>
    </div>
  )

  return (
    <div>
      <h4 className="text-muted font-weight-light text-uppercase mb-4">
        <FontAwesomeIcon icon={faPlus} className="mr-2 float-right cursor-pointer text-success"
          title="Create task"/>
        Tasks
      </h4>
      <div className="text-secondary">The page shows list of tasks either you or someone else created.</div>
      <Search />
      <div className="row">
        <Requests />
        <Tasks />
      </div>
    </div>  
  )
};

export default TasksPage;
