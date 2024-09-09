'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const hashedPasswordJohn = await bcrypt.hash('password123', saltRounds);
    // console.log(hashedPasswordJohn)
    const hashedPasswordJane = await bcrypt.hash('password456', saltRounds);

    await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: hashedPasswordJohn,
      tasks: 10,
      completedTasks: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
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
