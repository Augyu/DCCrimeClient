import React, { Component } from "react";
import axios from "axios";

class CrimeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      type: "",
      stime: "",
      etime: ""
    };
  }

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    // get our form data out of state
    const { location, type, stime, etime } = this.state;
    console.log(location, type, stime, etime);
    // axios.get('/', { location, type, stime, etime })
    //   .then((result) => {
    //     //access the results here....
    //     console.log(result);
    //   });
    const url =
      process.env.REACT_APP_SERVER_URL +
      stime +
      "/" +
      etime +
      "/" +
      location +
      "/" +
      type;
    axios.get(url).then(data => {
      console.log(data.data);
    });
  };

  render() {
    const { location, type, stime, etime } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        Location:&nbsp;
        <input
          type="text"
          name="location"
          value={location}
          onChange={this.onChange}
        />
        &nbsp;&nbsp;Type:&nbsp;
        <input type="text" name="type" value={type} onChange={this.onChange} />
        &nbsp;&nbsp;Start Time:&nbsp;
        <input
          type="date"
          name="stime"
          value={stime}
          onChange={this.onChange}
        />
        &nbsp;&nbsp;End Time:&nbsp;
        <input
          type="date"
          name="etime"
          value={etime}
          onChange={this.onChange}
        />
        <br />
        <button type="submit">Search</button>
      </form>

    );
  }
}
export default CrimeSearch;
