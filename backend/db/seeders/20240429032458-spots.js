'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Spot Ave',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Place',
        description: 'A place to stay and enjoy the city of Las Vegas',
        price: 250
      },
      {
        ownerId: 1,
        address: '234 Spot Ave',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Oasis',
        description: 'A place to stay and enjoy the city of Las Vegas',
        price: 200
      },
      {
        ownerId: 2,
        address: '345 Spot Ave',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Cool Place',
        description: 'A place to stay and enjoy the city of Las Vegas',
        price: 600
      },
      {
        ownerId: 2,
        address: '456 Spot Ave',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Great Place',
        description: 'A place to stay and enjoy the city of Las Vegas',
        price: 450
      },
      {
        ownerId: 3,
        address: '567 Spot Ave',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Cheap Place',
        description: 'A place to stay and enjoy the city of Las Vegas',
        price: 34
      },
      {
        ownerId: 3,
        address: '678 Spot Ave',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Okay Place',
        description: 'A place to stay and enjoy the city of Las Vegas',
        price: 50
      },

    ], { validate: true }, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
