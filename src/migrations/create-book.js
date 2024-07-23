'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {type: Sequelize.STRING},
      price: {type: Sequelize.FLOAT, defaultValue: 0},
      available: {type: Sequelize.STRING, defaultValue: 'Out of stock'},
      image: {type: Sequelize.STRING},
      description: {type: Sequelize.TEXT},
      category_code: {type: Sequelize.STRING},
      createdAt: {allowNull: false,type:'TIMESTAMP',defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')},
      updatedAt: {allowNull: false,type:'TIMESTAMP',defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Boos');
  }
};