

var socket = io();



socket.on('connect', function () {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('Se perdio la conexion con el servidor');
})
socket.on('recibirMensaje', function (resp) {
    console.log(resp)
    setChatMessage(resp.user, resp.message);
})
// Enviar informacion
document.getElementById("inputChat").addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      sendMessage();
    }
  });

function sendMessage() {
    const user = document.getElementById("inputUserName").value;
    const message = document.getElementById("inputChat").value;
    if(user != '' && message != ''){
        setOwnerMessage();
        socket.emit('enviarMensaje', {
            user,
            message
        }, function (callback) {
            console.log(callback);
        }
        )
    }
    
}



function setChatMessage(user, message) {
    const valueLabel = document.getElementById("labelChat").innerHTML == undefined ||
        document.getElementById("labelChat").innerHTML == null ?
        '' : document.getElementById("labelChat").innerHTML;
    document.getElementById("labelChat").innerHTML = valueLabel  + '<strong>-' + user + '</strong>' + ': ' + message+  '<br>';
}

function setOwnerMessage() {
    const valueLabel = document.getElementById("labelChat").textContent == undefined ||
        document.getElementById("labelChat").innerHTML == null ?
        '' : document.getElementById("labelChat").innerHTML;
    const user = document.getElementById("inputUserName").value;
    const message = document.getElementById("inputChat").value;
    document.getElementById("labelChat").innerHTML = valueLabel + '<strong>- ' + user + '</strong>' + ': ' + message + '<br>';
    document.getElementById("inputChat").value = '';
}