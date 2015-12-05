var serveStatic = require('serve-static');
var express = require('express');
var _eval = require('eval');
var app = express();
app.use(express.static(__dirname));
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(7070);
var receivedJSCode = "";

io.sockets.on('connection', function(socket) {
    socket.on('send', function(data) {
        
        var receivedJSCode = data.message;
        var modifiedReceivedJSCode = receivedJSCode.replace("'", "\'");
        var theJavaScriptSourceCode = 'var myInjectedVariable = "";' + modifiedReceivedJSCode + 'function print(p){myInjectedVariable+=p;myInjectedVariable+="\\n";}exports.theFinalReturnedThing = myInjectedVariable;';

        var res = _eval(theJavaScriptSourceCode);
        console.log(res.theFinalReturnedThing);

        io.sockets.emit('message', {
            message: res.theFinalReturnedThing
        });

    });
});
