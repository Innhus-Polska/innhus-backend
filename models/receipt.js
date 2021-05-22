'use strict';
module.exports = (sequelize, DataTypes) => {
    const Receipt = sequelize.define('Receipt', {
        patient_id: DataTypes.STRING,
        treatment_name: DataTypes.STRING,
        treatment_amount: DataTypes.STRING,
        treatment_info: DataTypes.TEXT,
        receipt_code: DataTypes.STRING
    }, {});
    Receipt.associate = function(models) {
        // associations can be defined here
        Receipt.belongsTo(models.user, {
            foreignKey: 'patient_id',
            targetKey: 'uuid'
        });
    };
    return Receipt;
};
