'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.role = require('./role')(sequelize, Sequelize);
db.user = require('./user')(sequelize, Sequelize);
db.appointment = require('./appointment')(sequelize, Sequelize);
db.notification = require('./notification')(sequelize, Sequelize);
db.patientResults = require('./patientresults')(sequelize, Sequelize);
db.patientReceipts = require('./receipt')(sequelize, Sequelize);
db.chat = require('./chat');

const UserRoles = sequelize.define('UserRoles', {
    userId: Sequelize.INTEGER,
    roleId: Sequelize.INTEGER
});

db.role.belongsToMany(db.user, {
    through: UserRoles,
    foreignKey: 'roleId',
    constraints: false
});

db.user.belongsToMany(db.role, {
    through: UserRoles,
    foreignKey: 'userId',
    constraints: false
});

db.ROLES = ['patient', 'doctor', 'admin'];

module.exports = { db };
