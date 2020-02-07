const Message = require('../models/message');


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