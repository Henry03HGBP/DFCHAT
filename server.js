const express = require('express');
const http = require('http');
const socketio = require('socket.io')

const aplicacion = express();
const servidor = http.createServer(aplicacion)

const io = socketio(servidor);

const puerto = 3000

// Archivos estaticos del servidor 

aplicacion.use(express.static(__dirname));

aplicacion.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
})

io.on('conexion', (socket) => {
    console.log('Cliente conectado al servidor')

    socket.on('mensaje', (mensaje) => {
        io.emit("mensaje", mensaje)
    })

    socket.on('desconectado', () => {
        console.log('Un usuario desconectado')
    })
});

servidor.listen(puerto, () => {
    console.log(`Servidor en el puerto ${puerto}`)
});