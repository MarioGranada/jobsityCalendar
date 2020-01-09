import React from 'react';
import HomeContainer from './containers/HomeContainer/HomeContainer';
import 'typeface-roboto';
import Header from './shared/components/Header/Header';
import Footer from './shared/components/Footer/Footer';

import './App.css';

const App = () => {
  // Since this is a single container application, there is no need to add routing module
  return (
    <div className="App">
      <Header />
      <HomeContainer />
      <Footer />
    </div>
  );
};

export default App;
