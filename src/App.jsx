import React from 'react';
import HeaderContainer from './containers/HeaderContainer.jsx'
import MainContainer from './containers/MainContainer.jsx'

function App() {
  return (
    <div className="App">
      <div id='navbar'>
        <HeaderContainer />
      </div>
      <div>
        
      </div>
      <div id='maincontainer'>
        <MainContainer />
      </div>
      <div id='signin'>
        <a href="/signin">sign in</a>
      </div>
      <div id='signout'
      onClick={
        () => {
          document.cookie = 'username=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
      }
      >sign out</div>
    </div>
  );
}

export default App;
