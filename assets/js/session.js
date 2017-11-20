import React from 'react';
import Alerts from './components/Alerts.js'
import MapContainer from './components/MapContainer'

export default class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  onTick() {
    // checks if new alert updates and pushes them to channel, else nothing
    this.props.channel.push("alerts_update"),
      receive("ok", state => this.setState(state));
  }

  render() {
    return (
      <div>
        <Alerts alerts={this.state.alerts} state={this.state} />
      </div>
    );
  }
}
