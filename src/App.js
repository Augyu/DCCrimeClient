import React, { Component } from "react";
import "./App.css";
import GoogleMap from "./component/GoogleMap";
//import DBQuery from './component/DBQuery';
import Filter from "./component/Filter";
import axios from "axios";

require("dotenv").config();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      update: false
    };
    this.handler = this.handler.bind(this);
  }
  componentDidMount() {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "data")
      .then(res => {
        res.data.forEach(result => {
          result.show = false;
        });
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }
  handler() {
    this.setState({ update: true });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Washington D.C. Crime Search</p>
        </header>
        <div className="search">
          {/*<CrimeSearch />*/}
          <Filter data={this.state.data} action={this.handler} />
        </div>
        <GoogleMap data={this.state.data} />
      </div>
    );
  }
}

export default App;
