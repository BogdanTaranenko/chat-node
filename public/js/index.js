//wrap in IIFE
    let socket = io();

socket.on('connect', function ()  {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log("new message", message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

$('#form-message').on('submit', function (e) {
   e.preventDefault();
   let inputValue = $('[name=input-message]');
   socket.emit('createMessage', {
       from: "User",
       text: inputValue.val()
   }, function () {
       inputValue.val('');
   })
});
