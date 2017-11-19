import React from 'react';
import Index from './Index';
import Alerts from './components/Alerts.js'

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
      <div class="container">
        <Alerts alerts={this.state.alerts} />
      </div>
    );
  }
}
