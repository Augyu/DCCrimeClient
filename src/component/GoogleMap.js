import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'red',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

const data = [{x:20, y:30.337844}, {x:10, y:40}]

class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 10,
      lng: 40
    },
    zoom: 11
  };
  
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {
            data.map(data=> (
              <AnyReactComponent
                lat={data.x}
                lng={data.y}
                text="T"
              />
            ))
          }
    
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;