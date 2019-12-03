import React, { Component } from "react";
import "./App.css";
import GoogleMap from "./component/GoogleMap";
//import DBQuery from './component/DBQuery';
import Filter from "./component/Filter";
import axios from "axios";
// import CrimeSearch from './component/search'

require("dotenv").config();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      update: false,
      heapMapData: []
    };
    this.handler = this.handler.bind(this);
  }
  componentDidMount() {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "data")
      .then(res => {
        res.data.forEach(result => {
          result.show = false;
          result.infoShow = false;
          result.tweets = [];
          // this.heapMapData.push(result.latitude);
          // console.log(result.latitude)
        });
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log(err);
        return null;
      });
    
  }
  handler() {
    this.state.update
      ? this.setState({ update: false })
      : this.setState({ update: true });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Washington D.C. Crime Search</p>
        </header>
        <div className="Filter">
          <Filter data={this.state.data} action={this.handler} />
        </div>
        <div className="Map">
          <GoogleMap data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
