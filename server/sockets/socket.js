const { io } = require('../server')
const Agenda = require('agenda');
const { urlDB } = require('../config/config');

// const client = io.on('connection', (client) => {
// });


// 
const clientExport = io.on('connection', (client) => {
    console.log('Usuario conectado');
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    })

    // Escuchar el client
    client.on('enviarMensaje', (req) => {
        client.join('room', () => console.log(`Socket ${client.id} joined room`));
        io.emit('recibirMensaje' , {
            user: req.user,
            message: req.message,
            date: req.date
        });
    });
})
const createJob = () => {
    let agenda = new Agenda({db: {address: urlDB}});

        agenda.define('testAgendaJob', function(job) {
            console.log('emitio test');
            emitTest();
        });
        agenda.on('ready', function() {
            agenda.every('10 seconds', 'testAgendaJob');
            agenda.start();
        });

}
const emitTest = () => {
    io.emit('recibirMensaje' , {
        user: 'Test',
        message: 'Job',
        date: Date.now()
    });
}
module.exports = {
    clientExport,
    createJob
}