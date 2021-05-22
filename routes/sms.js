import smsController from '../controllers/sms';

export default function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/sms/send", smsController.send);
    app.post("/api/sms/verify", smsController.verify);
};
