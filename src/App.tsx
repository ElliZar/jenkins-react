import React from 'react';
import { env } from './env'

function App() {
  return (
   <div>
     <h1>First approach env variable - {env.REACT_APP_HOST_IP_ADDRESS}</h1>
   </div>
  );
}

export default App;
