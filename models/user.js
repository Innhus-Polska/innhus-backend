'use strict';
const { Sequelize } = require('sequelize');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.role);
        }
    }

    User.init({
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [2, 255],
                    msg: 'length violation'
                }
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [2, 255],
                    msg: 'length violation'
                }
            }
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: {
                    msg: 'date violation'
                }
            }
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [9, 13],
                    msg: 'phone violation'
                },
                isNumeric: {
                    msg: 'non-numeric phone number'
                }
            }
        },
        pesel: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        sex: {
            type: DataTypes.ENUM(['male', 'female', 'other']),
            allowNull: true
        },
        pass_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parent_user: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sign_data: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_active: {
            type: DataTypes.STRING,
            allowNull: true
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address_first_line: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address_second_line: {
            type: DataTypes.STRING,
            allowNull: true
        },
        document_choice: {
            type: DataTypes.STRING,
            allowNull: true
        },
        document_count: {
            type: DataTypes.STRING,
            allowNull: true
        },
        document_reason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        document_doctor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        document_nurse: {
            type: DataTypes.STRING,
            allowNull: true
        },
        declared: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_verify_token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'User'
    });
    return User;
};
