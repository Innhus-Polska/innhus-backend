require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
require('express-async-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const socketIO = require('socket.io');
const ch = require('chalk');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();

// const privkey = fs.readFileSync('/etc/letsencrypt/live/app.widoknazdrowie.pl/privkey.pem');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/app.widoknazdrowie.pl/fullchain.pem');
const server = https.createServer({
    // key: privkey,
    // cert: certificate
}, app);

const io = socketIO(server);

app.set('io', io);

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', true);
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use(
    cookieParser(),
    jsonParser,
    urlencodedParser,
    morgan('tiny'),
    cors({
        origin: 'http://localhost:8081',
        credentials: true
    })
);

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import smsRoutes from './routes/sms';
import signRoutes from './routes/sign';
import appointmentRoutes from './routes/appointment';
import notificationRoutes from './routes/notification';
import chatRoutes from './routes/chat';
import doctorRoutes from './routes/doctors';
import nursesRoutes from './routes/nurses';

authRoutes(app);
userRoutes(app);
smsRoutes(app);
doctorRoutes(app);
nursesRoutes(app);
signRoutes(app);
chatRoutes(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

const { db } = require('./models');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

server.listen(process.env.PORT || 8082, () => {
    process.env.NODE_ENV
        ? console.log(
            ch.bgGreen(`Server on run in ${process.env.NODE_ENV} mode`)
        )
        : console.log(
            ch.bgRed(
                `Server on run, but ${ch.inverse(
                    ch.bgRed('NODE_ENV')
                )} variable was not found. Set it in your .env file next time. Default is "development"`
            )
        );
});

db.sequelize.sync({ force: false }).then(() => {
    db.role.create({
        name: 'patient',
        createdAt: new Date(),
        updatedAt: new Date()
    });
    db.role.create({
        name: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date()
    });
    db.role.create({
        name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
    });
});
