'use strict';

/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await  SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fescapebrooklyn.com%2Fcuriosity-lane-modern-weston-ct%2F&psig=AOvVaw0rhbn-vQQ58ck6zjJzLrrR&ust=1717731502941000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPiQ0YiHxoYDFQAAAAAdAAAAABAE',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://escapebrooklyn.com/wp-content/uploads/2022/04/11.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://escapebrooklyn.com/wp-content/uploads/2022/04/11.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'testUrl3',
        preview: true
      },
      {
        spotId: 2,
        url: 'testUrl4',
        preview: false
      },
      {
        spotId: 3,
        url: 'testUrl5',
        preview: true
      },
      {
        spotId: 3,
        url: 'testUrl5',
        preview: false
      },
    ], { validate: true }, options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
