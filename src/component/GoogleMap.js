import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import ping from "./ping.png";
import "./GoogleMap.css";
import axios from "axios";
require("dotenv").config();

class InfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // this.props.text.tweets.map(tweet => console.log(tweet.tweet_date))
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
class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  render() {
    return (
      <div>
        <img src={ping} alt="Marker" style={{ width: 30, height: 30 }}></img>
        {this.props.text.infoShow && <InfoWindow text={this.props.text} />}
      </div>
    );
  }
}

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
      counter: true
    };
    this.markerOnClick = this.markerOnClick.bind(this);
  }
  markerOnClick(event) {
    this.props.data.forEach(function(element) {
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
  }
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
  }
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "80vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildClick={this.markerOnClick}
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
    );
  }
}

export default GoogleMap;
