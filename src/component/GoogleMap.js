import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import ping from "./ping.png";
require('dotenv').config()
// const AnyReactComponent = ({ text }) => (
//   <div style={{
//     color: 'white', 
//     background: 'red',
//     padding: '15px 10px',
//     display: 'inline-flex',
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '100%',
//     transform: 'translate(-50%, -50%)'
//   }}>
//     {text}
//   </div>
// );

const PingComponent = () => (
  <img src = {ping} alt = "Ping" style={{width:30, height:30}}></img>
)

class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 38.88,
      lng: -77.03
    },
    zoom: 11
  };
  constructor(props){
    super(props);
    this.state = {
      counter: 0,
    }
    // this.handleClick = this.handleClick.bind(this);
  }
  
  // componentDidMount(){
  //   axios
  //     .get(process.env.REACT_APP_SERVER_URL+'data')
  //     .then(res => {
  //       this.setState({data: res.data})
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       return null;
  //     });
  // }

  // onChildClick = key => {
  //   console.log(key);
  // };

  // handleClick = (e) => {
  //   e.preventDefault();
  //   console.log('ya')
  // };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          // onChildClick={this.onChildClick}
        >
          {
            this.props.data.map(data => (
              data.show? <PingComponent
                key={data.octo_record_id_key}
                lat={data.latitude}
                lng={data.longitude}               
              /> : null
            ))
          }
        </GoogleMapReact>
      </div>
    );
  }
}



export default GoogleMap;