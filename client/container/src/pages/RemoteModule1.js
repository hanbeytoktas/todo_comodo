import React from 'react';
import DynamicModuleLoader from '../modules/DynamicModuleLoader';

const RemoteModule1 = () => {
  const [system, setSystem] = React.useState({
    url: 'http://localhost:3001/remoteEntry.js',
    scope: 'plugin1',
    module: './module1'
  });

  return <DynamicModuleLoader system={system} />;
};

export default RemoteModule1;
