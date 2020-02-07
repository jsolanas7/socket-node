const mongoose = require('mongoose');

let Schema = mongoose.Schema;



let messageSchema = new Schema({
    user: {
        type: String
    },
    message: {
        type: String,
    },
    date:{
        type: Date
    }
});


module.exports = mongoose.model('message', messageSchema);