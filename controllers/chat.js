const { db } = require('../models');
const Chat = db.chat;

exports.sendMessage = (req, res) => {
    Chat.findById(req.params.chatID, (err, chat) => {
        //res.send({err:err, chatObj: chat});
	const io = req.app.get("io");
        chat.messages.push(req.body);
        Chat.findByIdAndUpdate(chat._id, {$set: {messages:chat.messages}}, (err2, chat2) => {
            io.emit('onNewMessage', chat2);
        });
	res.status(200).send(chat);
    });
};

exports.getMessages = (req, res) => {
    Chat.findOne({uuid1: req.params.uuid1, uuid2: req.params.uuid2}, (err, chat1) => {
        if (!chat1) {
	    Chat.findOne({uuid1: req.params.uuid2, uuid2: req.params.uuid1}, (err, chat2) => {
                if (!chat2) {
                    let newChat = new Chat({
                        uuid1: req.params.uuid1,
                        uuid2: req.params.uuid2,
                        messages: []
                    });
		    newChat.save();
                    res.status(200).send(newChat);
                } else {
                    res.status(200).send(chat2);
                }
            });
        } else {
            res.status(200).send(chat1);
        }
    });
};
