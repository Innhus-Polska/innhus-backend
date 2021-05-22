require('dotenv').config();
const { db } = require('../models');
const User = db.user;
const Appointment = db.appointment;
const Notification = db.notification;
const Receipts = db.patientReceipts;
const Results = db.patientResults;
const jwt = require('jsonwebtoken');
const { v5 : uuid5 } = require('uuid');
const bcrypt = require('bcryptjs');

exports.updateUser = (req, res) => {
    User.update(
        {
            login: req.body.login,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            pesel: req.body.pesel,
            address: req.body.address,
            birth_date: req.body.birth_date,
            phone_number: req.body.phone_number,
            sign_data: req.body.sign_data,
            address_first_line: req.body.address_first_line,
            address_second_line: req.body.address_second_line,
            document_choice: req.body.document_choice,
            document_count: req.body.document_count,
            document_reason: req.body.document_reason,
            document_doctor: req.body.document_doctor,
            document_nurse: req.body.document_nurse,
            declared: req.body.declared,
        }, {
        where: {
            uuid: req.params.id
        }
    }).then((response) => {
        if (response.login !== '' || response === 1) {
            res.status(200).send({
                message: 'Update process finished.'
            });
        } else {
            res.status(500).send({
                message: 'Update process failed.'
            });
        }
    });
};

exports.getInfo = (req, res) => {
    User.findOne({
        where: {
            uuid: req.params.id
        }
    }).then((user) => {
        if (user) {
            res.status(200).send({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.login,
                is_active: user.is_active,
                phone_number: user.phone_number,
                declared: user.declared,
                verified: user.user_verify_token === '1'
            });
        } else {
            res.status(200).send({ user_exists: false });
        }
    });
};

exports.getAllInfo = (req, res) => {
    User.findOne({
        where: {
            uuid: req.params.id
        }
    }).then((user) => {
        res.status(200).send(
            user ? {
                login: user.login,
                first_name: user.first_name,
                last_name: user.last_name,
                pesel: user.pesel,
                address: user.address,
                birth_date: user.birth_date,
                phone_number: user.phone_number,
                pass_hash: user.pass_hash,
                sign_data: user.sign_data,
                address_first_line: user.address_first_line,
                address_second_line: user.address_second_line,
                document_choice: user.document_choice,
                document_count: user.document_count,
                document_reason: user.document_reason,
                document_doctor: user.document_doctor,
                document_nurse: user.document_nurse,
                declared: user.declared,
                verified: user.user_verify_token === '1'
            } : {
                user_exists: false
            }
        );
    });
};

exports.findByPhoneNo = (req, res) => {
    User.findOne({
        where: {
            phone_number: req.params.phone
        }
    }).then((user) => {
        res.status(200).send(user ? {
            user_exists: true,
            uuid: user.uuid
        } : {
            user_exists: false
        });
    });
};

exports.findByEmail = (req, res) => {
    User.findOne({
        where: {
            login: req.params.email
        }
    }).then((user) => {
        res.status(200).send(user ? {
            user_exists: true,
            uuid: user.uuid
        } : {
            user_exists: false
        });
    });
};

exports.getAppointments = (req, res) => {
    const uuid = req.body.uuid;
    const results = Appointment.findAll({
        where: {
            patient_id: uuid
        }
    });
    return results;
};
exports.getReceipts = (req, res) => {
    const uuid = req.body.uuid;
    Receipts.findAll({
        where: {
            patient_id: uuid
        }
    }).then((receipts) => {
        if (receipts) {
            res.status(200).send(receipts);
        }
    });
};
exports.getNotifications = (req, res) => {
    const uuid = req.body.uuid;
    Notification.findAll({
        where: {
            patient_id: uuid
        }
    }).then((notifications) => {
        if (notifications) {
            res.status(200).send(notifications);
        }
    });
};
exports.getResults = (req, res) => {
    const uuid = req.body.uuid;
    Results.findAll({
        where: {
            patient_id: uuid
        }
    }).then((results) => {
        if (results) {
            res.status(200).send(results);
        }
    });
};
exports.verifyToken = (req, res) => {
    const token = req.body.auth_token;
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.status(200).send({ message: 'User verified' });
        }
    });
};

exports.getSubaccounts = (req, res) => {
    User.findAll({
        where: {
            parent_user: req.params.id
        }
    }).then((users) => {
        const filtered = users.filter((user) => {
            return {
                uuid: user.uuid,
                full_name: `${user.first_name} ${user.last_name}`
            }
        });
        res.status(200).send({
            filtered
        });
    });
};

exports.sendEmail = (req, res) => {
    User.findOne({
        where: {
            uuid: req.params.id
        }
    }).then((user) => {
        if (!user) {
            res.status(200).send({ email_sent: false });
        } else {
            const email = user.login;
            const nodemailer = require('nodemailer');
            const transport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
		    type: "OAuth2",
                    user: "noreply.widoknazdrowie@gmail.com",
                    clientId: "419770454666-jd8jqf9iqcjrcgvic0b13mg4tuoklucp.apps.googleusercontent.com",
                    clientSecret: "WsZ4ekWBcx4Xs8_Wuf8FlawG",
                    accessUrl: "https://oauth2.googleapis.com/token",
                    accessToken: "ya29.a0AfH6SMAdaYv_eK-FQVr00ocsevXQnRIuWFpGel1ANYQXsEFPln9wZaQE6CtW1SuIqCNHT5gzKCDis8Ppjc3QUaH8zWYQ5CxvnxU9fW05kXRowJocG3kq90FvyuT9nmXlBToBKKTK92TozHae-GYat_uuM2Yh",
                    refreshToken: "1//0951x1myq8Fd7CgYIARAAGAkSNgF-L9Ir7rs0lgsl99Jmdeh0ho5y_YpF3RmUciYaFFcCd1jlKlJcX7lWLUJLVm1Z4hPA_9tSEA",
                    token_type: 'Bearer',
                    expires: 1620933689602,
                },
                tls: {
                    ciphers:'SSLv3'
                }
            });
            const type = req.body.type;
            let text;
            let html;
            const regex = /\[\[link\]\]/gi;
            if (type === "pass_link") {
                text = req.body.text.replace(regex, `https://app.widoknazdrowie.pl/nowe-haslo/${user.uuid}?token=${user.password_token}`);
                html = req.body.html.replace(regex, `https://app.widoknazdrowie.pl/nowe-haslo/${user.uuid}?token=${user.password_token}`);
            } else if (type === "generic") {
                text = req.body.text;
                html = req.body.html;
            } else if (type === "verify_link") {
                text = req.body.text.replace(regex, `https://app.widoknazdrowie.pl/weryfikuj/${user.uuid}?token=${user.user_verify_token}`);
                html = req.body.html.replace(regex, `https://app.widoknazdrowie.pl/weryfikuj/${user.uuid}?token=${user.user_verify_token}`);
            }
            const info = transport.sendMail({
                from: '"NZOZ Widok" <noreply.widoknazdrowie@gmail.com>',
	        to: email,
	        subject: req.body.subject,
	        text: text,
	        html: html,
            }).then(() => {
                res.status(200).send({ email_sent: true });
            });
        }
    });
};

exports.checkUser = (req, res) => {
    const { uuid } = req.params;
    const { token } = req.query;
    User.findOne({ where: { user_verify_token: token } }).then((user) => {
        if (!user) {
            res.status(500).send({ error: true, message: 'Użytkownik z podanym tokenem nie istnieje. Konto mogło zostać już aktywowane.' });
        } else {
            User.update({ user_verify_token: '1' }, { where: { uuid: user.uuid } }).then((response) => {
                res.status(200).send({ error: false, message: 'Użytkownik został zweryfikowany!' });
            });
        }
    });
	};

exports.changePassword = (req, res) => {
    const { uuid } = req.params;
    const { token, password, confirm_password } = req.body;
    User.findOne({ where: { password_token: token } }).then((user) => {
        if (!user) {
            req.status(500).send({ error: true, message: 'No user with specified token.' });
        } else {
            if (password === confirm_password) {
                User.update({
                    pass_hash: bcrypt.hashSync(password, 8),
                    password_token: uuid5('new_password_token', '2c7c7aba-cbab-4c4b-bf3b-d3c6857d2ec4')
                }, {
                    where: { uuid: user.uuid }
                }).then((response) => {
                    res.status(200).send({ error: false, message: 'Password updated' });
                });
            } else {
                res.status(500).send({ error: true, message: 'Not matching passwords' });
            }
        }
    });
};

