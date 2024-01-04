
const BandList = require('./band-list')

class Sockets{
    constructor(io){
        this.io = io;
        this.bandList = new BandList()
        this.socketEvents();
    }

    socketEvents(){
        //On Connection
        this.io.on('connection', (socket) => {
            console.log('Cliente Conectado');
            
            //Emitir Las Bandas Actuales
            socket.emit('current-bands', this.bandList.getBands())
            //votar por la banda
            socket.on('votar-banda', (id) => {
                this.bandList.increaseVotes(id)
                this.io.emit('current-bands', this.bandList.getBands())
            })
            socket.on('borrar-banda', (id) => {
                this.bandList.removeBands(id)
                this.io.emit('current-bands', this.bandList.getBands())
            })
            socket.on('cambiar-nombre', ({id, nombre}) => {
                this.bandList.changeName(id, nombre)
                this.io.emit('current-bands', this.bandList.getBands())
            })
            socket.on('agregar-banda', ({nombre}) => {
                this.bandList.addBand(nombre)
                this.io.emit('current-bands', this.bandList.getBands())
            })

        });
    }
    }

module.exports = Sockets;