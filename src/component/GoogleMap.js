import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import ping from "./ping.png";
import purpleping from "./purpleping.png";
import "./GoogleMap.css";
import axios from "axios";
require("dotenv").config();

/* global google */
// The box that display the detail of the crime event
class InfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="info">
          {this.props.text.report_date}
          <br></br>({this.props.text.latitude}, {this.props.text.longitude})
        </div>
        {this.props.text.tweets.map(tweet => (
          <div className="info">
            {tweet.tweet_date}
            <br></br>
            {tweet.tweet_text}
          </div>
        ))}
      </div>
    );
  }
}
// The ping that shows on the Google Map
class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  render() {
    var val = Boolean(this.props.text.is_twitter === "1");
    return (
      <div className='marker'>
        {val && (
          <img
            className="icon"
            src={ping}
            alt="Marker"
            style={{ width: 30, height: 30 }}
          ></img>
        )}
        {!val && (
          <img
            className="icon"
            src={purpleping}
            alt="Marker"
            style={{ width: 30, height: 30 }}
          ></img>
        )}
        {this.props.text.infoShow && <InfoWindow text={this.props.text} />}
      </div>
    );
  }
}

// The Google map Component
class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 38.88,
      lng: -77.03
    },
    zoom: 11
  };
  constructor(props) {
    super(props);
    this.state = {
      counter: true,
      heatmapData: {
        positions: [],
        options: {
          radius: 20,
          opacity: 0.6
        }
      },
      heatmapVisible: false
    };
    this.markerOnClick = this.markerOnClick.bind(this);
    this.toggleHeatMap = this.toggleHeatMap.bind(this);
  }
  update = () => {
    this.props.action();
  };
  markerOnClick = async event => {
    await this.props.data.forEach(function(element) {
      if (element.octo_record_id_key === event) {
        element.infoShow = !element.infoShow;
        axios
          .get(process.env.REACT_APP_SERVER_URL + "data/" + event)
          .then(res => {
            element.tweets = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
    this.setState({ counter: !this.state.counter });
    // event.preventDefault();
  };
  getTweets(eventId) {
    axios
      .get(process.env.REACT_APP_SERVER_URL + "data/" + eventId)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
        return null;
      });
    this.update();
  }

  toggleHeatMap() {
    this.setState(
      {
        heatmapVisible: !this.state.heatmapVisible
      },
      () => {
        if (this._googleMap !== undefined) {
          this._googleMap.heatmap.setMap(
            this.state.heatmapVisible ? this._googleMap.map_ : null
          );
        }
      }
    );
  }

  onMapClick({ x, y, lat, lng, event }) {
    if (this._googleMap !== undefined) {
      const point = new google.maps.LatLng(lat, lng);
      this._googleMap.heatmap.data.push(point);
    }
  }
  render() {
    let heatData = {
      positions: [],
      options: {
        radius: 20,
        opacity: 0.6
      }
    }
    this.props.data.forEach(crime =>
      crime.show && 
      heatData.positions.push({
        lat: crime.latitude,
        lng: crime.longitude
      })
    ); 
    return (
      <div>
        <div className="floating">
          <button onClick={this.toggleHeatMap}>Show heatmap</button>
        </div>
        <div style={{ height: "90vh", width: "100%" }}>
          <GoogleMapReact
            ref={el => (this._googleMap = el)}
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            onChildClick={this.markerOnClick}
            heatmapLibrary={true}
            heatmap={heatData}
            // onClick={this.onMapClick.bind(this)}
          >
            {this.props.data.map(data =>
              data.show ? (
                <Marker
                  key={data.octo_record_id_key}
                  lat={data.latitude}
                  lng={data.longitude}
                  text={data}
                />
              ) : null
            )}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default GoogleMap;
