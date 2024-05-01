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
        url: 'testUrl1',
        preview: true
      },
      {
        spotId: 1,
        url: 'testUrl2',
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
