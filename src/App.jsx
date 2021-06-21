import React from 'react';
import HeaderContainer from './containers/HeaderContainer.jsx'
import MainContainer from './containers/MainContainer.jsx'

function App() {
  return (
    <div className="App">
      <div id='navbar'>
        <HeaderContainer />
      </div>
      <div id='maincontainer'>
        <MainContainer />
      </div>
    </div>
  );
}

export default App;
