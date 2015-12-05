var jsEditor = ace.edit("jsEditor");
jsEditor.setTheme("ace/theme/monokai");
jsEditor.getSession().setMode("ace/mode/javascript");

jsEditor.setValue("/* use print() instead of using console.log() */")

$(".runButton").click(function() {
    socket.emit('send', {
        message: jsEditor.getValue()
    });
});

var socket = io.connect('//localhost:7070/');

socket.on('message', function(data) {
    $('#result').text(data.message);
});
