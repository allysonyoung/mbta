import React from 'react';
import ReactDOM from 'react-dom';


const BOSTON_POSITION = {
  lat: 42.3601,
  lng: -71.0598
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Address:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class Map extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: BOSTON_POSITION,
      zoom: 16
    });
  }

  render() {
    const mapStyle = {
      width: 500,
      height: 300
    };

    return (
      <div>
        <h1>Next Bus</h1>
        <Form />
        <div ref="map" style={mapStyle}>I should be a map!</div>
      </div>
    );
  }
}

ReactDOM.render(
  <Map />,
  document.getElementById('map')
);
