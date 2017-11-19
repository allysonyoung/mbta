import React from 'react';
import ReactDOM from 'react-dom';

class Alerts extends React.Component {
  render() {
    let alerts = this.props.alerts;
    // FIGURE OUT HOW TO RENDER ELIXIR LISTS IN JS
    // SHOULD I USE MAP/ LISTS? I THOUGHT JS HAD LISTS
    // SO I DON'T SEE WHY THIS NO LOG/ WORK
    console.log(alerts);
    return (
      <div>
        <h1>ALERTS</h1>
        <table>
        <tbody id="alerts">
            <tr>
                <td>"alerts go here"</td>
            </tr>
       </tbody>
       </table>
      </div>
    );
  }
};

ReactDOM.render(<Alerts />, document.getElementById('alerts-section'));
