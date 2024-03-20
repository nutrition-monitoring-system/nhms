import React from 'react';

import BasicTableComponent from '../../../components/UserTable';



function App() {

  return (
    <div className="App">

    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3>User Information</h3>
    </div>
    <div style={{ border: '20px solid transparent' }}>
    <BasicTableComponent />
</div>

 
   

    </div>
  );
}

export default App;
