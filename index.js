const path = require('path');
const express = require('express');
const app = express();

// puerto donde se va a ejecutar el servidor: localhost:3000
app.set('port', process.env.PORT || 3000);
// Se usan los archivos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));
// Se inicia el servidor
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

// websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

// conexion con el navegador, se comprueba si alguien esta conectado
io.on('connection', (socket) => {
    console.log('new conection', socket.id);
    // Con el metodo on podemos escuchar eventos
    socket.on('chat:message', (data) => {
        // Con el metodo emit podemos enviar eventos
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
});

