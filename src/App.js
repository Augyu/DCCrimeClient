import React from 'react';
//import logo from './logo.svg';
import './App.css';
import GoogleMap from './component/GoogleMap';
import DBQuery from './component/DBQuery';
import CrimeSearch from './component/search'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Washington D.C. Crime Search</p>
      </header>
      <body className='search'>
        <CrimeSearch />
      </body>
      <GoogleMap />
      <DBQuery />
    </div>
  );
}

export default App;
