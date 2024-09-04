'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tasks', [{
      title: 'Complete project report',
      description: 'Finish the annual project report and submit it to the manager.',
      completed: false,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Buy groceries',
      description: 'Purchase groceries for the week.',
      completed: true,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
