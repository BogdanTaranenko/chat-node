const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);

let io = socketio(server);


io.on('connection', (socket) => {
   console.log('New user connected');


   socket.on('createMessage', (message) => {
      console.log('create message', message);
       io.emit('newMessage', {
          from: message.from,
          text: message.text,
          createAt: new Date().getTime()
       });
   });

   socket.on('disconnect', () => {
       console.log("User leave page");
    })
});

app.use(express.static(publicPath));

server.listen(port, () => {
   console.log(`Running on port ${port}`);
});