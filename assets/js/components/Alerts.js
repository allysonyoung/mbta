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
        <td>
          <strong>{this.props.header}</strong>
          <br/>
          <small>{this.props.description}</small>
        </td>
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
    this.state.filter = "none";
  }

  filterAlerts(alerts_list, filter) {
    let filtered = alerts_list;
    if (filter != "none") {
      filtered = _.filter(alerts_list, function(a) {
        return a.severity == filter;
      });
    }
    return filtered;
  }

  onFilterClick(e) {
    this.setState({filter: e.target.value});
  }    

  render() {
    let alerts_list = this.filterAlerts(this.props.alerts, this.state.filter);
    let count = 1;
    let alerts_text = _.map(alerts_list, a => (
      <Alert header={a.header} description={a.description} severity={a.severity} key={count++} />
    ));
    let val = 1;

    return (
      <div className="container">
        <h1>ALERTS</h1>
        <p className="pb-3">
          Filters:
          <span className="btn-group ml-3" id="filters">
            <button className="btn btn-sm btn-outline" onClick={this.onFilterClick.bind(this)} value="none">Show All</button>
            <button className="btn btn-sm btn-outline-secondary" onClick={this.onFilterClick.bind(this)} value="Information">Information</button>
            <button className="btn btn-sm btn-outline-info" onClick={this.onFilterClick.bind(this)} value="Minor">Minor</button>
            <button className="btn btn-sm btn-outline-warning" onClick={this.onFilterClick.bind(this)} value="Moderate">Moderate</button>
            <button className="btn btn-sm btn-outline-danger" onClick={this.onFilterClick.bind(this)} value="Severe">Severe</button>
          </span>
        </p>
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
