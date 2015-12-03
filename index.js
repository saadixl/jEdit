var serveStatic = require('serve-static');
var express = require('express');
var _eval = require('eval');
var app = express();
app.use(express.static(__dirname));
app.listen(7070);
var receivedJSCode = 'var x = 5; console.log(x); console.log(x++);';
var modifiedReceivedJSCode = receivedJSCode.replace("console.log", "myInjectedVariable +=");
var theJavaScriptSourceCode = 'var myInjectedVariable = "";' + modifiedReceivedJSCode +'exports.theFinalReturnedThing = myInjectedVariable;';

//console.log(x);
//myInjectedVariable +=

var res = _eval(theJavaScriptSourceCode);
console.log(res.theFinalReturnedThing);
