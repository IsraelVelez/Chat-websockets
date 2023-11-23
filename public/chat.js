// envia los eventos al servidor
const socket = io()

// elementos en el DOM 
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

// Cuando se da click al boton se envia el mensaje
btn.addEventListener('click', function () {
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    });
});

// cuando se esta escribiendo se envia el usuario que lo hace
message.addEventListener('keypress', function () {
    socket.emit('chat:typing', username.value);
});

// Se recibe el mensaje y se escribe en el navegador
socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
});

// Se recibe quien esta escribiendo y se pone el usuario con el mensaje 
socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p><em>${data} is typing a message.</em></p>`
});