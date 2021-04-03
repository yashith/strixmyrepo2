import React from 'react';
import Auth from './Container/Auth'
import SprintDashboard from './Components/Report/SprintDashboard'
import SprintModal from './Components/Report/SprintSummaryModal'

function App() {
  return (
    <div className="App">
      {/* <Auth /> */}
      <SprintDashboard/>
      {/* <SprintModal/> */}
    </div>
  );
};

export default App;
