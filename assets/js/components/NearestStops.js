import React from 'react';
import ReactDOM from 'react-dom';

export default class NearestStops extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stops: []
    }
  }

  componentDidMount() {
    fetch('http://realtime.mbta.com/developer/api/v2/stopsbylocation?api_key=qOvLKXlU8Equ8FBGnIMWaA&lat=42.352913&lon=-71.064648&format=json')
    .then(results => {
      return results.json();
    }).then(data => {
      let stops = data.stop.map((stop) => {
        return(
          <div>
            <p>{stop.stop_name}</p>
          </div>
        )
      })
      this.setState({ stops: stops });
      console.log(this.state.stops);
    })
  }

  render() {
    return (
      <div>
        {this.state.stops}
      </div>
    )
  }
}
