import React from 'react';
import './App.css';

import MainPath from './components/MainPath';
import MainView from './components/MainView';

const PLAYGROUND = 'MainPath'


function App() {

  MainView(PLAYGROUND);

  return (
    <>
      <MainPath/>
    </>
  );
}

export default App;
