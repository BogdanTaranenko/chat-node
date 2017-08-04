//wrap in IIFE


    let socket = io();

socket.on('connect', function ()  {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: "Bogdan",
        text: "work!"
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log("new message", message);
});