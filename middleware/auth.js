const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;

export function verifyToken(req, res, next) {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({
            message: 'No token provided'
        });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized'
            });
        }
        req.userId = decoded.id;
        next();
    });
}

export function isPatient(req, res, next) {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'patient') {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: 'Require patient role'
            });
        });
    });
}

export function isDoctor(req, res, next) {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'doctor') {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: 'Require doctor role'
            });
        });
    });
}

export function isAdmin(req, res, next) {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'admin') {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: 'Require admin role'
            });
        });
    });
}
