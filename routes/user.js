import * as auth from "../middleware/auth";
const controller = require("../controllers/user");

export default function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/user/verifyToken",
        controller.verifyToken
    );

    app.get(
        '/api/user/phone/:phone',
        controller.findByPhoneNo
    );

    app.get(
        "/api/user/email/:email",
        controller.findByEmail
    );

    app.post(
        "/api/user/send/:id",
        controller.sendEmail
    );

    app.get(
        "/api/user/verify/:uuid",
        controller.checkUser
    );

    app.post(
        "/api/user/password/:uuid",
        controller.changePassword
    );

    app.put(
        "/api/user/:id",
        controller.updateUser
    );

    app.get(
        "/api/user/:id",
        controller.getInfo
    );

    app.get(
        '/api/user/:id/all',
        controller.getAllInfo
    );

    app.get(
        '/api/user/:id/sub',
        controller.getSubaccounts
    );

    app.get(
        "/api/user/:id/appointments",
        [auth.verifyToken],
        controller.getAppointments
    );

    app.get(
        "/api/user/:id/notifications",
        [auth.verifyToken],
        controller.getNotifications
    );

    app.get(
        "/api/user/:id/receipts",
        [auth.verifyToken],
        controller.getReceipts
    );

    app.get(
        "/api/user/:id/results",
        [auth.verifyToken],
        controller.getResults
    );

}
