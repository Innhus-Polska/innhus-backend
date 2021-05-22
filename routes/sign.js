import controller from '../controllers/sign';
import * as auth from '../middleware/auth';

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/sign",
        controller.sign
    );

    app.post(
        "/api/sign/get",
        [auth.verifyToken],
        controller.getSignature
    );

    app.get(
        "/api/sign/choices",
        controller.getChoices
    );

    app.get(
        "/api/sign/choices/:id",
        controller.getChoice
    );

    app.get(
        "/api/sign/reasons",
        controller.getReasons
    );

    app.get(
        "/api/sign/reasons/:id",
        controller.getReason
    );

    app.get(
        "/api/sign/counts",
        controller.getChoiceCounts
    );

    app.get(
        "/api/sign/counts/:id",
        controller.getChoiceCount
    );
};
