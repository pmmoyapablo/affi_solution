'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Users', [{
        id: crypto.randomUUID(),
        name: 'Manuel Rojas',
        email: 'manuelrojasduque@gmail.com',
        password: '$2a$10$KMipL66hM3LrlQQrhXwhSe8GN3VGJEJ55WCvWEH.V/m7WBuQuNt9m',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        name: 'Pablo Moya',
        email: 'pmmoyapablo@hotmail.com',
        password: '$2a$10$KMipL66hM3LrlQQrhXwhSe8GN3VGJEJ55WCvWEH.V/m7WBuQuNt9m',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        name: 'Yamilet Guzman',
        email: 'ygzm1245@hotmail.com',
        password: '$2a$10$KMipL66hM3LrlQQrhXwhSe8GN3VGJEJ55WCvWEH.V/m7WBuQuNt9m',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
