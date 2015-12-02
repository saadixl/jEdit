var serveStatic = require('serve-static');
var express = require('express');
var _eval = require('eval');
var app = express();
app.use(express.static(__dirname));
app.listen(7070);

var res = _eval('for(var x=0;x<2; x++){ }');
console.log(res);