import React from 'react';
import ReactDOM from 'react-dom';

import NearestStops from './NearestStops';

const BOSTON_POSITION = {
  lat: 42.3601,
  lng: -71.0598
};

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lng: 0
    }
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: BOSTON_POSITION,
      zoom: 16
    });

    this.geocoder = new google.maps.Geocoder();
  }

  geocodeAddress(geocoder, resultsMap) {
    var address = this.props.address;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  getLatLng(geocoder) {
    var address = this.props.address;
    geocoder.geocode({'address': address}, (results, status) => {
      if (status === 'OK') {
        this.setState({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        })
      }
    })
  }

  render() {
    const mapStyle = {
      width: 500,
      height: 450
    };

    if (this.props.submitted) {
      this.geocodeAddress(this.geocoder, this.map);
      this.getLatLng(this.geocoder);
    }

    return (
      <div>
        <p>{this.props.address}</p>
        <div ref="map" style={mapStyle}></div>
        <div>
          <h2>Bus Stops Near You</h2>
          <NearestStops lat={this.state.lat} lng={this.state.lng} />
        </div>
      </div>
    );
  }
}

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', submitted: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({submitted: true});
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Next Bus</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Address:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Map address={this.state.value} submitted={this.state.submitted} />
      </div>
    );
  }
}

ReactDOM.render(
  <Form />,
  document.getElementById('map')
);
