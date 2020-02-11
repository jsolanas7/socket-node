const Message = require('../models/message');
const { createJob } = require('../sockets/socket')
const { io } = require('../server');


const getAll = async() => {
    try{
        const messages = await Message.find()
        .lean()
        .exec();
        return messages;
    }catch{
        throw 'ups';
    }
}


const create = async(body)  => {
    try{
        const messageNew = new Message({
            user: body.user,
            message: body.message,
            date: Date.now()
        })
        const message = await messageNew.save();
        io.emit('recibirMensaje' , {
            user: message.user,
            message: message.message,
            date: message.date
        });
        createJob();
        return {
            user: message.user,
            message: message.message,
            date: message.date
        };
    }catch{
        throw 'ups';
    }
}

module.exports = {
    getAll,
    create
}