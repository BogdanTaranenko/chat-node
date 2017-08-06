//wrap in IIFE
let socket = io();
//toastr


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

    socket.on('newLocationMessage', function (message){
        let li = $('<li></li>');
        let a = $('<a target="_blank">My current location</a>');
    
        li.text(`${message.from}: `);
        a.attr('href', message.url);

        li.append(a);
        $('#messages').append(li);
    });

    $('#message-form').on('submit', function (e) {
       e.preventDefault();
       let input = $('#input-message');
       socket.emit('createMessage', {
           from: "User",
           text: input.val()
       }, function () {
           input.val('');
       })
    });

    let locationButton = $('#send-location');
    locationButton.on('click', function () {
       if(!navigator.geolocation) {
           alert("Not supported!")
       }

       locationButton.attr('disabled', 'disabled').text('Sending...');


       navigator.geolocation.getCurrentPosition(function (position) {
           locationButton.removeAttr('disabled').text('Send location');

           socket.emit('createLocationMessage', {
               latitude: position.coords.latitude,
               longitude: position.coords.longitude
           })
       }, function () {
           locationButton.removeAttr('disabled').text('Send location');
           alert("Unable to fetch!")
       })
    });
