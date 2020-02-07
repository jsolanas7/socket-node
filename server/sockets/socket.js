const { io } = require('../server')

io.on('connection', (client) => {

    console.log('Usuario conectado');


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
        
    })

    // Escuchar el client
    client.on('enviarMensaje', (req,callback) => {

        callback({
            mensaje: 'Se disparo el callback'
        })

        
        client.broadcast.emit('recibirMensaje' , {
            user: req.user,
            message: req.message
        });
        

    });

    
})