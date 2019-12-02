import React, { Component } from "react";
import "./Filter.css";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "THEFT/OTHER",
      options: ["THEFT/OTHER", "HOMICIDE", "THEFT F/AUTO"],
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
      crime.offense === this.state.value ? (crime.show = true) : (crime.show = false)
    );
    this.update();
	};
	handleSubmit(event) {
		this.setShow()
		event.preventDefault();
	}
	handleChange(event) {
		this.setState({value: event.target.value});
	}
  render() {
    return (
      <div className="Filter">
				<form onSubmit={this.handleSubmit}>
        <label>
          Crime Type:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="THEFT/OTHER">THEFT/OTHER</option>
            <option value="HOMICIDE">HOMICIDE</option>
            <option value="ROBBERY">ROBBERY</option>
            <option value="MOTOR VEHICLE THEFT">MOTOR VEHICLE THEFT</option>
						<option value="SEX ABUSE">SEX ABUSE</option>
						<option value="THEFT F/AUTO">THEFT F/AUTO</option>
						<option value="ASSAULT W/DANGEROUS WEAPON">ASSAULT W/DANGEROUS WEAPON</option>
						<option value="BURGLARY">BURGLARY</option>
						<option value="ARSON">ARSON</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      	</form>
      </div>
    );
  }
}

export default Filter;
