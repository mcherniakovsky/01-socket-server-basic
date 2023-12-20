const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Sockets = require('./sockets')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer(this.app);

        // configuraciones de sockets

        this.io = socketIo(this.server, {
            cors: {
                origin: "http://localhost:8080",
                methods: ["GET", "POST"],
                transports: ['websocket', 'polling'],
                credentials: true
            },
            allowEIO3: true
        });
    }

    middlewares(){
        this.app.use(express.static(path.resolve(__dirname, '../public')))
    }

    configurarSockets(){
        new Sockets(this.io)
    }

    execute(){
        //init middleware
        this.middlewares();
        this.configurarSockets();
        //init server
        this.server.listen(this.port, () =>{
            console.log('Server corriendo en port: '+this.port);
        });
    }
}

module.exports = Server;