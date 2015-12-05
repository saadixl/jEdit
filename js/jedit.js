var jsEditor = ace.edit("jsEditor");
jsEditor.setTheme("ace/theme/monokai");
jsEditor.getSession().setMode("ace/mode/javascript");

$("#jsEditor").keyup(function() {
    $('#result').text(jsEditor.getValue());
});

var socket = io.connect('/');

socket.emit('send', { message: 'yo yo yo from browser' });

socket.on('message', function (data) {
       console.log(data.message);
});


