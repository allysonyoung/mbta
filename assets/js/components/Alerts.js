import React from 'react';
import ReactDOM from 'react-dom';

class Alerts extends React.Component {
  render() {
    return (
      <div>
        <h1>ALERTS</h1>
        <p>Alerts will go here.</p>
      </div>
    );
  }
};

ReactDOM.render(<Alerts />, document.getElementById('alerts-section'));
