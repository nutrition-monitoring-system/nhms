import React from 'react';

import BasicTableComponent from '../../../components/userTable';
// import Table from '../../../components/userTable1'



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
// {/* <div className="App">
//       <header className="App-header">
//         <p>
//           My Table App
//         </p>
//       </header>
//       <Table />
//     </div> */}




  );
}

export default App;
