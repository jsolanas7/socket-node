const { io } = require('../server')

// const client = io.on('connection', (client) => {
// });


// 
io.on('connection', (client) => {
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