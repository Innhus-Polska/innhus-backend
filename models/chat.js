const mongoose = require('mongoose');
const { String } = mongoose.Schema.Types;
const Chat = new mongoose.Schema({
    uuid1:{type:String},
    uuid2:{type:String},
    messages:[{
        content: String,
        user:{type:String},
        createdDate: {type:Date, default:Date.now()},
    }]
});
module.exports = mongoose.model("Chat", Chat);
