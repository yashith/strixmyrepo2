import React from 'react';
import Auth from './Container/Auth'
import SprintDashboard from './Components/Report/SprintDashboard'
import SprintModal from './Components/Report/SprintSummaryModal'
import MonthlyBugSummary from './Components/Report/MonthlyBugSummary'

function App() {
  return (
    <div className="App">
      {/* <Auth /> */}
      <SprintDashboard/>
      {/* <SprintModal/> */}
      {/* <MonthlyBugSummary/> */}
    </div>
  );
};

export default App;
