const express = require('express');
const app = express();
const { getAll, create} = require('../repository/message.repository')
const { eventMessage } = require('../sockets/socket');
const { io } = require('../server')


app.post('/chat/create' , [], async function(req, res){
    try{
        const newMessage = await create(req.body);
        // eventMessage(newMessage);
        // socketEmit(newMessage.user, newMessage.message);
        // socketEmit('adna2', 'anda');
        return res.json(newMessage)
    }
    catch(err){
        res.status(400).json(err);
    }
})

app.get('/chat/getall', [], async (req,res) => {
    try{
        const messages = await getAll();
        res.status(200).json(messages)
    }catch(err){
        res.status(400).json({
            ok: false,
            err,
            message : 'Hubo un problema'
        })
    } 
})

function socketEmit(user,message) {
    io.on('connection', (client) => {
        client.broadcast.emit('recibirMensaje' , {
            user: user,
            message: message
        });
      }
    )
}
module.exports = app;