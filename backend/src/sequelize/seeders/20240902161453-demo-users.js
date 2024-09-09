'use strict';

const crypto = require("node:crypto");
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const saltRounds = 10;
    const hashedPasswordJohn = await bcrypt.hash('password123', saltRounds);
    const hashedPasswordJane = await bcrypt.hash('password456', saltRounds);

    await queryInterface.bulkInsert('users', [{
      userId: '2e96c1f8-409d-43aa-9203-583a71a95a0b',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: hashedPasswordJohn,
      tasks: 10,
      completedTasks: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      userId: 'ae96c5ad-6534-4e16-b81f-7b8e26a508c0',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: hashedPasswordJane,
      tasks: 20,
      completedTasks: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
