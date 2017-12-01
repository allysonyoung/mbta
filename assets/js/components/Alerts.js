import React from 'react';
import ReactDOM from 'react-dom';

class Alert extends React.Component {
  render() {
    let severity = this.props.severity
    return (
      <tr>
        <td className="text-left">
            {this.renderSeverity(severity)}
        </td>
        <td>{this.props.text}</td>
      </tr>
    );
  }

  renderSeverity(severity) {
    switch(severity) {
      case "Severe":
        return (
          <span className="btn btn-sm btn-block btn-danger disabled">
            {severity}
          </span>
        );
        break;
      case "Moderate":
        return (
          <span className="btn btn-sm btn-block btn-warning disabled">
            {severity}
          </span>
        );
        break;
      case "Minor":
        return (
          <span className="btn btn-sm btn-block btn-info disabled">
            {severity}
          </span>
        );
        break;
      default:
        return (
          <span className="btn btn-sm btn-block btn-outline-secondary disabled">
            {severity}
          </span>
        );
    }
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
    let alerts_text = _.map(alerts_list, a => (
      <Alert text={a.text} severity={a.severity} key={count++} />
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
