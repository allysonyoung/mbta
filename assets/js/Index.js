import React from 'react';

import Alerts from './components/Alerts.js';
import MapContainer from './components/MapContainer';

/**
  * Main parent component.
  */
export default class Index extends React.Component {
  render() {
    return (
      <div>
        <MapContainer />
        <Alerts />
      </div>
    );
  }
}
