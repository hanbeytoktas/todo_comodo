import React from 'react';
import DynamicModuleLoader from '../modules/DynamicModuleLoader';

const RemoteModule2 = () => {
  const [system, setSystem] = React.useState({
    url: 'http://localhost:3002/remoteEntry.js',
    scope: 'plugin2',
    module: './module2'
  });

  return <DynamicModuleLoader system={system} />;
};

export default RemoteModule2;
