'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Roles', [
            {
                name: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'doctor',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'patient',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Roles', null, {});
    }
};
