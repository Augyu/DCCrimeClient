import React, { Component } from "react";
import axios from "axios";
require('dotenv').config()

class DBQuery extends Component {
  state = {
    crimeData: {},
    latAndLong: {}
  };
  getUsers = () => {
    axios
      .get(process.env.REACT_APP_SERVER_URL+'data')
      .then(data => this.setState({ crimeData: data.data }))
      .catch(err => {
        console.log(err);
        return null;
      });
  };
  render() {
    return <div>{JSON.stringify(this.state.crimeData)}</div>;
  }
  componentDidMount() {
    this.getUsers();
  }
  reverseGeoCoding = () => {
      axios
        .get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key='+process.env.REACT_APP_GOOGLE_API)
        .then(data => this.setState({ latAndLong: data}))
        .catch(err => {
            console.log(err);
            return null;
        })
  }
}

export default DBQuery;
