import React from 'react';
import ReactDOM from 'react-dom';

const BOSTON_POSITION = {
  lat: 42.3601,
  lng: -71.0598
};

class Map extends React.Component {
  constructor() {
    super();
    this.currLat = 0;
    this.currLng = 0;
    this.locateMe = this.locateMe.bind(this);
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: BOSTON_POSITION,
      zoom: 16
    });
  }

  locateMe() {
    navigator.geolocation.getCurrentPosition((pos) => {
        var coords = pos.coords;
        this.currLat = coords.latitude;
        this.currLng = coords.longitude;
    })
    var CURR = {
      lat: this.currLat,
      lng: this.currLng
    }

    this.map.panTo(CURR);
  }

  render() {
    const mapStyle = {
      width: 500,
      height: 300
    };

    return (
      <div>
        <button onClick={this.locateMe}>Locate Me</button>
        <div ref="map" style={mapStyle}>I should be a map!</div>
      </div>
    );
  }
}

ReactDOM.render(
  <Map />,
  document.getElementById('map')
);
