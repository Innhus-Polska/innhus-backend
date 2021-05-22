'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                login: 'patient@internal.mail',
                first_name: 'Testeriusz',
                last_name: 'Testowski',
                birth_date: new Date(1990, 1, 1),
                phone_number: 123123123,
                phone_prefix: 48,
                address: 'ul. Testowa 1/1, 01-001 Kraków',
                pesel: '90010112345',
                sex: 'male',
                role: 'patient',
                pass_hash: bcrypt.hashSync('1234', 8),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                login: 'doctor@internal.mail',
                first_name: 'Testeriusz',
                last_name: 'Testowski',
                birth_date: new Date(1990, 1, 1),
                phone_number: 123123123,
                phone_prefix: 48,
                address: 'ul. Testowa 1/1, 01-001 Kraków',
                pesel: '90010112346',
                sex: 'male',
                role: 'doctor',
                pass_hash: bcrypt.hashSync('1234', 8),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                login: 'admin@internal.mail',
                first_name: 'Testeriusz',
                last_name: 'Testowski',
                birth_date: new Date(1990, 1, 1),
                phone_number: 123123123,
                phone_prefix: 48,
                address: 'ul. Testowa 1/1, 01-001 Kraków',
                pesel: '90010112347',
                sex: 'male',
                role: 'admin',
                pass_hash: bcrypt.hashSync('1234', 8),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
