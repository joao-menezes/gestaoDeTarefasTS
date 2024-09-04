'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      tasks: 10,
      completedTasks: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password456',
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
