import React, { Component } from "react";
import "./Filter.css";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "THEFT/OTHER",
      stime: "2017-01-01",
      etime: "2018-12-31",
      selectValue: "",
      renderButton: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  update = () => {
    this.props.action();
  };
  setShow = () => {
    this.props.data.map(crime =>
      crime.offense === this.state.type && crime.report_date >= this.state.stime && crime.report_date <= this.state.etime
        ? (crime.show = true)
        : (crime.show = false)
    );
    this.update();
  };
  handleSubmit(event) {
    this.setShow();
    event.preventDefault();
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <div className="Filter">
        <form onSubmit={this.handleSubmit}>
          <label>
            Start Time:
            <input
              type="date"
              name="stime"
              value={this.state.stime}
              onChange={this.handleChange}
            />
          </label>
          <label>
            End Time:
            <input
              type="date"
              name="etime"
              value={this.state.etime}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Crime Type:
            <select
              name="type"
              value={this.state.type}
              onChange={this.handleChange}
            >
              <option value="THEFT/OTHER">THEFT/OTHER</option>
              <option value="HOMICIDE">HOMICIDE</option>
              <option value="ROBBERY">ROBBERY</option>
              <option value="MOTOR VEHICLE THEFT">MOTOR VEHICLE THEFT</option>
              <option value="SEX ABUSE">SEX ABUSE</option>
              <option value="THEFT F/AUTO">THEFT F/AUTO</option>
              <option value="ASSAULT W/DANGEROUS WEAPON">
                ASSAULT W/DANGEROUS WEAPON
              </option>
              <option value="BURGLARY">BURGLARY</option>
              <option value="ARSON">ARSON</option>
            </select>
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default Filter;
