

var socket = io();



socket.on('connect', function () {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function () {
    console.log('Se perdio la conexion con el servidor');
})
socket.on('recibirMensaje', function (resp) {
    console.log(resp);
    console.log('Este es el evento on recibir mensajes');
    
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
    httpPost(user,message);
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

function httpGet(){

        var xmlHttp;
        xmlHttp = new XMLHttpRequest(); 
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.status == 200) {
                console.log(xmlHttp.responseText); // "" (empty string)
            }
        };
        xmlHttp.open( "GET", 'http://localhost:3000/chat/getall', true );
        xmlHttp.send( );
}


function httpPost(user,message){
    var formData = new FormData();
    formData.append("user", user);
    formData.append("message", message);
    var xmlHttp;
    xmlHttp = new XMLHttpRequest(); 
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.status == 200) {
            console.log(xmlHttp.responseText); // "" (empty string)
        }
    };
    xmlHttp.open( "POST", 'http://localhost:3000/chat/create' );
    console.log(user);
    xmlHttp.send(formData);
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