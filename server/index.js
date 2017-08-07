const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');


const {isRealString} = require('./utils/validation');
const {generateMessage} = require('./utils/message');
const {Users} = require('./utils/users');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);

app.use(express.static(publicPath));

let io = socketio(server);
let users = new Users();


io.on('connection', (socket) => {
   console.log('New user connected');



   socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required')
        }


       socket.join(params.room);
       users.removeUser(socket.id);
       users.addUser(socket.id, params.name, params.room);


       io.to(params.room).emit('updateUserList', users.getUserList(params.room));
       socket.emit('newMessage', generateMessage('Admin', 'Hello and welcome to our chat!'));
       socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `Everybody say hello to ${params.name}`));
       callback();
   });

    socket.on('createMessage', (message, callback) => {
        let user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback();
   });


   socket.on('disconnect', () => {
       let user = users.removeUser(socket.id);

       if (user) {
           io.to(user.room).emit('updateUserList', users.getUserList(user.room));
           io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
       }
    })
});



server.listen(port, () => {
   console.log(`Running on port ${port}`);
});