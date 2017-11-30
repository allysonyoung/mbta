import React from 'react';
import ReactDOM from 'react-dom';

class Alert extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.text}</td>
      </tr>
    );
  }
}

export default class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  render() {
    let alerts_list = this.props.alerts;
    let count = 1;
    let alerts_text = _.map(alerts_list, text => (
      <Alert text={text} key={count++} />
    ));
    return (
      <div className="container">
        <h1>ALERTS</h1>
        <table className="table">
        <tbody id="alerts">
            {alerts_text}
       </tbody>
       </table>
      </div>
    );
  }
};

function reactDOM() {
  if (document.getElementById('alerts-section') != null) {
    ReactDOM.render(<Alerts />, document.getElementById('alerts-section'));
  }
}

$(reactDOM)
