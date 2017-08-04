const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const {generateMessage} = require('./utils/message');

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

   socket.on('createMessage', (message) => {
      console.log('create message', message);
          io.emit('newMessage', generateMessage(message.from, message.text));
       // socket.broadcast.emit('newMessage', {
       //     from: message.from,
       //     text: message.text,
       //     createAt: new Date().getTime()
       // })
   });

   socket.on('disconnect', () => {
       console.log("User leave page");
    })
});

app.use(express.static(publicPath));

server.listen(port, () => {
   console.log(`Running on port ${port}`);
});