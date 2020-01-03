import React from 'react';
import HomeContainer from './containers/HomeContainer/HomeContainer';

const App = () => {
  // Since this is a single container application, there is no need to add routing module
  return (
    <div className="App">
      <header className="App-header">this is my header</header>
      <HomeContainer />
      <footer> this is my footer</footer>
    </div>
  );
};

export default App;
