import { v5 as uuid5 } from 'uuid';

const NAMESPACE = 'bc5a053d-68d3-433b-81ff-f8b4b41d17ca';

const { db } = require('./../models');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        uuid: uuid5(req.body.phone_number, NAMESPACE),
        login: req.body.login || null,
        first_name: req.body.first_name || null,
        last_name: req.body.last_name || null,
        birth_date: req.body.birth_date || null,
        phone_number: req.body.phone_number,
        phone_prefix: req.body.phone_prefix || null,
        address: req.body.address || null,
        pesel: req.body.pesel || null,
        sex: req.body.sex || null,
        parent_user: req.body.parent_user || null,
        roles: ['patient'],
        pass_hash: bcrypt.hashSync(req.body.password, 8),
        password_token: uuid5('newPasswordToken', NAMESPACE),
        user_verify_token: uuid5('newUserVerifyToken', NAMESPACE),
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({
                        message: 'User was registered successfully!',
                        user_id: user.uuid
                    });
                });
            });
        } else {
            // user role = 1
            user.setRoles([1]).then(() => {
                res.send({
                    message: 'User was registered successfully!',
                    user_id: user.uuid
                });
            });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
    const condition = ((req.body.phone_number === '') ? { login: req.body.login } : { phone_number: req.body.phone_number });
    User.findOne({
        where: condition
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.pass_hash
            );

            if (!passwordIsValid) {
                return res.status(403).send({
                    accessToken: null,
                    message: 'Invalid Password!'
                });
            }

            const token = jwt.sign({ id: user.uuid }, process.env.SECRET);

            let authorities = [];
            user.getRoles().then(async roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push('ROLE_' + roles[i].name.toUpperCase());
                }
                await res.status(200).send({
                    uuid: user.uuid,
                    login: user.login,
                    roles: authorities,
                    auth_token: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signout = (req, res) => {
    User.update({ is_active: false }, {
        where: {
            uuid: req.body.uuid
        }
    }).then(() => {
        res.status(200).send({ message: 'Logout successful' });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};
