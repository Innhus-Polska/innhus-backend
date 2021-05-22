const jwt =  require("jsonwebtoken");
const { db } = require('../models');
const ROLES = db.ROLES;
const User = db.user;

const validateLogin = (req, res, next) => {
    User.findOne({
        where: {
            login: req.body.email ? req.body.email : ''
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: 'Email already in use'
            });
            return;
        }
        User.findOne({
            where: {
                phone_number: req.body.phone_number
            }
        }).then(user => {
            if ((req.body.phone_number !== '' || req.body.phone_number !== null) && user) {
                res.status(400).send({
                    message: 'Phone number already in use'
                });
                return;
            }

            next();
        });
    });
};

const validateRole = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: 'Role doesn\'t exist: ' + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};

const verifySignup = {
    validateRole: validateRole,
    validateLogin: validateLogin
}

module.exports = verifySignup;
