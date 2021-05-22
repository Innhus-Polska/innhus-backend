'use strict';
module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        appointment_id: DataTypes.STRING,
        date: DataTypes.STRING,
        time: DataTypes.STRING,
        user: DataTypes.STRING,
        doctor: DataTypes.STRING
    }, {});
    Appointment.associate = function(models) {
        // associations can be defined here
        Appointment.belongsTo(models.user, {
            foreignKey: 'user',
            targetKey: 'uuid'
        });
    };
    return Appointment;
};
