const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlDB, port } = require('./config/config');
// const { createJob } = require('./jobs/jobs');


const path = require('path');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(publicPath));
// IO = esta es la comunicacion del backend
// Exportamos IO para usarlo en socket.js
module.exports.io = socketIO(server);

//Indico que use el archivo de socket.js
require('./sockets/socket')
// createJob();

//controllers
app.use(require('./controllers/message.controller'));
mongoose.connect(urlDB,
    { useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true},
     (err,res) => {
if( err ) throw 'No se pudo conectar a la base, error : '+ err;
console.log('Base de datos ONLINE');
});

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});