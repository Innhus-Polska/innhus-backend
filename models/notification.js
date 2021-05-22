'use strict';
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        patient_id: DataTypes.STRING,
        type: DataTypes.STRING,
        data: DataTypes.TEXT
    }, {});
    Notification.associate = function(models) {
        // associations can be defined here
        Notification.belongsTo(models.user, {
            foreignKey: 'patient_id',
            targetKey: 'uuid'
        });
    };
    return Notification;
};
