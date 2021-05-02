// npm install webpack@5.4.0 webpack-cli@4.5.0 webpack-dev-server@3.11.0 faker@5.1.0 html-webpack-plugin@5.1.0
import faker from 'faker';
// var Kafka = require('no-kafka');

// var consumer = new Kafka.SimpleConsumer();

const socket = new WebSocket('ws://localhost:3000/cable');

socket.onopen = function(e) {
  console.log("[open] Connection established");
  console.log("[open] Sending message");
  const msg = {
    command: 'subscribe',
    identifier: JSON.stringify({
      id: 87,
      channel: 'ApplicationMessagesChannel'
    })
  };
  
  socket.send(JSON.stringify(msg));

  // socket.send(JSON.stringify({"command": "subscribe","identifier":"{\"channel\":\"RoomChannel\"}"}))

  // setTimeout(function(){ socket.send(JSON.stringify({"command": "speak", message: 'Holi'})); }, 10000);
};

socket.onmessage = function(event) {
  const response = event.data;
  const msg = JSON.parse(response);
  if (msg.type === "ping") {
    return;
  }
  if(msg.type) {
    console.log(`[message] Data received from server: ${msg.type}`);
  }else if(msg.message) {
    console.log(`[message] Data received from server: ${msg.message.message}`);
    mount(msg.message.message);
  }else {
    console.log("[message] Data received from server: Mensaje no reconocido" );
  }

  console.log(response);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log('[close] Connection died');
  }
};

socket.onerror = function(error) {
  console.log(`[error] ${error.message}`);
};

const mount = (message) => {
  let div = document.createElement('div');
  let divElementText = document.createTextNode(message);
  div.appendChild(divElementText);
    
  // Append the div to the body
  document.body.appendChild(div);
};
