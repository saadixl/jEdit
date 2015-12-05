var serveStatic = require('serve-static');
var express = require('express');
var _eval = require('eval');
var app = express();
app.use(express.static(__dirname));
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.listen(7070);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'this is a message from server' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

var receivedJSCode = 'var x = 5; print(x); print(x++);';
var modifiedReceivedJSCode = receivedJSCode.replace("'", "\'");
var theJavaScriptSourceCode = 'var myInjectedVariable = "";' + modifiedReceivedJSCode + 'function print(p){myInjectedVariable+=p;myInjectedVariable+="\\n";}exports.theFinalReturnedThing = myInjectedVariable;';


var res = _eval(theJavaScriptSourceCode);
console.log(res.theFinalReturnedThing);
