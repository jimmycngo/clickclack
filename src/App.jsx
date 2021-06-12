import React from 'react';
import Header from './components/Header.jsx'
import MainContainer from './containers/MainContainer.jsx'

function App() {
  return (
    <div className="App">
      <div id='navbar'>
        <Header />
      </div>
      <div id='maincontainer'>
        <MainContainer />
      </div>
    </div>
  );
}

export default App;
