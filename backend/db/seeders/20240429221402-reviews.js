'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'This is a review about the spot',
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: 'This is a review about the spot',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'This is a review about the spot',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'This is a review about the spot',
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: 'This is a review about the spot',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'This is a review about the spot',
        stars: 5
      },
    ], { validate: true }, options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2] }
    }, {});
  }
};
