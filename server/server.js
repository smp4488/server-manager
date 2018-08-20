var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nspHosts = io.of('/hosts');
var nspClients = io.of('/clients');
var hosts= [];
var clients = {};

app.get('/servers', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(hosts));
});

app.get('/servers/:id', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    hosts.forEach(function(host) {
        if(host.id == req.params.id) {
            res.send(JSON.stringify(host));
        }
    });
});

io.on('connection', function(socket){
    console.log('a host connected');
    socket.on('system_connected', function(systemInfo){
        systemInfo.id = socket.id;
        hosts.push(systemInfo);
    });

    socket.on('disconnect', function(){
        console.log('a host disconnected');
        delete hosts[socket.id];
        //nspClients.emit('hosts',hosts);
    });
});

// nspClients.on('connection', function(socket){
//     console.log('a client connected');
//     clients[socket.id] = socket;
//     //io.to(socket.id).emit('hosts',hosts);
//     socket.broadcast.to(socket.id).emit('hosts',hosts);
//     //socket.emit('hosts',hosts);
// });

http.listen(3000, function(){
    console.log('listening on *:3000');
});