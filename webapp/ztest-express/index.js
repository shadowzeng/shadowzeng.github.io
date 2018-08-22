var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send('Hello world!');
});

app.get('/zeng',function(req,res){
    res.send('xxxxx');
});

app.get('/reb',function(req,res){
    res.send('rebecca');
});

var server = app.listen(8000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});