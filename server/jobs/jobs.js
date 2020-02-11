const Agenda = require('agenda');
const { urlDB } = require('../config/config');
const { io } = require('../server')


const createJob = () => {
    let agenda = new Agenda({db: {address: urlDB}});

    agenda.define('testAgendaJob', function(job) {
        // console.log("Sending newsletter. Time: " +
        // new Date().getMinutes() + ":" + new Date().getSeconds());
        io.emit('testAgenda' , {
            message: 'testAgenda'
        });
        console.log('emitio test');
      });
      
      agenda.on('ready', function() {
        agenda.every('10 seconds', 'testAgendaJob');
        agenda.start();
      });
}

module.exports = {
    createJob
}

