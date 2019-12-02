import React, { Component } from 'react';
import './Filter.css';


class Filter extends Component{
  constructor(props){
    super(props);
    this.state = {
			type: '',
			options: ['THEFT/OTHER','HOMICIDE','THEFT F/AUTO'],
			selectValue: '',
			renderButton:''
    }
	}

	setShow = (data) => {
		data.map(crime => (
			(crime.offense === 'THEFT/OTHER') ? crime.show=true :null	
		));
		console.log(data);
		//update = {this.props.action}
	}
  render() {
		this.setShow(this.props.data)
    return (
			<div>
				<p>haha</p>
				<button onClick={this.props.action} />
			</div>
    );
	}
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

export default Filter;