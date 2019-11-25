import React from 'react';
//import logo from './logo.svg';
import './App.css';
import GoogleMap from './component/GoogleMap';
import DBQuery from './component/DBQuery';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Washington D.C. Crime Search</p>
      </header>
      <GoogleMap />
      <DBQuery />
    </div>
  );
}

export default App;
