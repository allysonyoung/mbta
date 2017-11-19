// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";

import React from 'react';
import ReactDOM from 'react-dom';
import socket from "./socket";
import Session from "./session";
import Index from './Index';

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

function ready(channel, state) {
  let index = document.getElementById('index');
  ReactDOM.render(<Session state={state} channel={channel} />, index);
}

/*
// this is real one
function start() {
  let channel = socket.channel("user:" + window.user_id, {});
  console.log(channel);
  channel.join()
    .receive("ok", state0 => {
      console.log("Joined successfully", state0);
      ready(channel, state0);
    })
    .receive("error", resp => {
      console.log("Unable to join", resp);
    });
}
*/

// testing
function start() {
  channel = null;
  state = Session.new();
  console.log(state);
  ready(channel, state);
}

$(start);

