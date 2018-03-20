var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session')
var bp = require('body-parser');
var port = 8000;


app.use(bp.json());
app.use(session({saveUninitialize:true, secret:"key"}));
app.use(express.static(path.join(__dirname, '/client/dist'))) //this line goes into dist folder and grabs index.html to serv so you dont need a get home route


require('./server/config/mongoose')
require('./server/config/routes')(app)


app.listen(port, function(){
    // console.log("hi im listening - loginRegAng");
})
