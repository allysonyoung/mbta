import React from 'react';

import Alerts from './components/alerts.js';
import Directions from './components/directions.js';

/**
  * Main parent component.
  */
export default class Index extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-8">
          <Directions />
        </div>
        <div className="col-4">
          <Alerts />
        </div>
      </div>
    );
  }
};
