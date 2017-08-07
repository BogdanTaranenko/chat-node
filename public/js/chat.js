//wrap in IIFE
let socket = io();
let formattedTime;

    function scrollToBottom() {
        let messages = $('#messages');
        let newMessage = messages.children('li:last-child');


        let clientHeight = messages.prop('clientHeight');
        let scrollTop = messages.prop('scrollTop');
        let scrollHeight = messages.prop('scrollHeight');
        let newMessageHeight = newMessage.innerHeight();
        let lastMessageHeight = newMessage.prev().innerHeight();

        if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
            messages.scrollTop(scrollHeight);
        }
    }


    socket.on('connect', function ()  {
        let params = $.deparam(window.location.search);

        socket.emit('join', params, function (err) {
            if(err){
                alert(err);
                window.location.href = '/';
            }
            else {
                console.log('No error')
            }
        });
    });

    socket.on('disconnect', function () {
        console.log('Disconnected from server');
    });

    socket.on('updateUserList', function (users) {
        let ol = $('<ol></ol>');
        
        users.forEach(function (user) {
            ol.append($('<li></li>').text(user))
        });

        $('#users').html(ol);
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
        scrollToBottom();
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
        scrollToBottom();
    });

    $('#message-form').on('submit', function (e) {
       e.preventDefault();
       let input = $('#input-message');
       if(!input.val()){
           return 0;
       }
       socket.emit('createMessage', {
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
