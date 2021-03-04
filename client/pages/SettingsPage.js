import React, { useContext, useState } from 'react';

import { AppContext } from '../AppContext';

import Loading from '../components/Loading';
import LoadingError from '../components/LoadingError';

const SettingsPage = () => {

  const { addons } = useContext(AppContext);

  const AddonTable = () => (
    <table className="table mt-2 bg-white">
      <thead>
        <tr>
          <th className="border-top-0" scope="col"></th>
          <th className="border-top-0 text-secondary" scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        { addons.data.map(a => <Addon key={a.name} addon={a}/>) }
      </tbody>
    </table>
  )

  const Addon = ({addon}) => (
    <tr>
      <td scope="col" className="font-weight-bold">{addon.label}</td>
      <td scope="col">{addon.description}</td>
    </tr>
  )

  return (
    <div>
      <h4 className="text-muted font-weight-light text-uppercase mb-4">
        Settings
      </h4>
      <div className="text-secondary">The page shows various tweaks and knobs noone really understand.</div>
      <h5 className="mt-4">Addons</h5>
      <div className="text-secondary">Addons are web components rendered on the right side of the page.</div>
      {
        addons.loading ? <Loading /> : 
        addons.error ? <LoadingError error = { products.error }/> :  
        <AddonTable />
      }
    </div>  
  )
};

export default SettingsPage;
