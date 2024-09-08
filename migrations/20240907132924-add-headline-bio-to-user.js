'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add 'headline' column, allowing null initially
    await queryInterface.addColumn('Users', 'headline', {
      type: Sequelize.STRING,
      allowNull: true, // Temporarily allow null
    })

    await queryInterface.addColumn('Users', 'bio', {
      type: Sequelize.TEXT,
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'headline')
    await queryInterface.removeColumn('Users', 'bio')
  },
}
