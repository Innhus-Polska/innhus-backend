const controller = require("../controllers/chat");

export default function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        '/api/chat/:uuid1/:uuid2',
        controller.getMessages
    );

    app.post(
        '/api/chat/:chatID',
        controller.sendMessage
    );

};
