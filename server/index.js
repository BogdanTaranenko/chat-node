const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);

let io = socketio(server);


io.on('connection', (socket) => {
   console.log('New user connected');


   socket.emit('newMessage', generateMessage('Admin', 'Hello and welcome to our chat!'));

   socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'Everybody say "Hello" to new user!',
      createAt: new Date().getTime()
   });

   socket.on('createMessage', (message, callback) => {
      console.log('create message', message);
          io.emit('newMessage', generateMessage(message.from, message.text));
          callback('This is from the server');
   });

   socket.on('createLocationMessage', (coords) => {
       io.emit('newLocationMessage', generateLocationMessage("Admin", coords.latitude, coords.longitude))
   });

   socket.on('disconnect', () => {
       console.log("User leave page");
    })
});

app.use(express.static(publicPath));

server.listen(port, () => {
   console.log(`Running on port ${port}`);
});