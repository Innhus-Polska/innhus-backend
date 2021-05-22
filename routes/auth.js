import * as verifySignup from './../middleware/verify'
const authController = require("../controllers/auth");
import GoogleAuth from '../middleware/google';

export default function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignup.validateLogin,
            verifySignup.validateRole
        ],
        authController.signup
    );

    app.post("/api/auth/signin", authController.signin);
    app.post("/api/auth/signout", authController.signout);
    app.get("/api/auth/google", GoogleAuth.getUrl);
    app.get("/api/auth/google/redir", GoogleAuth.redirect);
};
