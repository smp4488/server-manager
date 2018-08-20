var config = require('./config');
var configJson = require('./config.json');

var socket = require('socket.io-client')('http://localhost:3000/');

const si = require('systeminformation');

async function osinfo() {
    try {
      const data = await si.osInfo();
      //console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }

    // try {
    //     const os = await si.osInfo();
    //     const ntwk = await si.networkInterfaces();
    //     data = Object.assign(os, ntwk[0]);
    //     console.log(data);
    //   } catch (e) {
    //     console.log(e);
    //   }
}

socket.on('connect', function(){
    console.log('Connected to socket.io server');
    //  socket.emit('system_connected',osinfo());
    // callback style
    // si.osInfo(function(data) {
    //     console.log('CPU-Information:');
    //     console.log(data);
    //     socket.emit('system_connected',data);
    // });

     osinfo(data)
        .then(console.log(data))
    console.log(data);
    socket.emit('system_connected',data);
});
socket.on('event', function(data){
    console.log('socket.io event', data);
});
socket.on('disconnect', function(){
    console.log('Disonnected to socket.io server');
});