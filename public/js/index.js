//wrap in IIFE
let socket = io();
//toastr

let formattedTime;


    socket.on('connect', function ()  {
        console.log('Connected to server');
    });

    socket.on('disconnect', function () {
        console.log('Disconnected from server');
    });

    socket.on('newMessage', function (message) {
        formattedTime = moment(message.createdAt).format('h:mm a');
        let template = $('#message-template').html();
        let html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createdAt: formattedTime
        });

        $('#messages').append(html);
    });

    socket.on('newLocationMessage', function (message){
        formattedTime = moment(message.createdAt).format('h:mm a');

        let template = $('#location-message-template').html();
        let html = Mustache.render(template, {
           from: message.from,
            url: message.url,
            createdAt: formattedTime
        });

        $('#messages').append(html);
    });

    $('#message-form').on('submit', function (e) {
       e.preventDefault();
       let input = $('#input-message');
       if(!input.val()){
           return 0;
       }
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
