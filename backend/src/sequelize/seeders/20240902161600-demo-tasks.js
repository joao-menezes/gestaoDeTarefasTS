'use strict';
const crypto = require("node:crypto");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tasks', [{
      taskId: crypto.randomUUID(),
      title: 'Complete project report',
      description: 'Finish the annual project report and submit it to the manager.',
      completed: false,
      userId: '2e96c1f8-409d-43aa-9203-583a71a95a0b',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      taskId: crypto.randomUUID(),
      title: 'Buy groceries',
      description: 'Purchase groceries for the week.',
      completed: true,
      userId: 'ae96c5ad-6534-4e16-b81f-7b8e26a508c0',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
