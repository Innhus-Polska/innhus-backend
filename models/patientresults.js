'use strict';
module.exports = (sequelize, DataTypes) => {
    const PatientResults = sequelize.define('PatientResults', {
        patient_id: DataTypes.STRING,
        title: DataTypes.STRING,
        data: DataTypes.TEXT
    }, {});
    PatientResults.associate = function(models) {
        // associations can be defined here
        PatientResults.belongsTo(models.user, {
            foreignKey: 'patient_id',
            targetKey: 'uuid'
        });
    };
    return PatientResults;
};
