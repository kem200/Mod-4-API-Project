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
        city: 'Apple Valley',
        state: 'Utah',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Place',
        description: 'Welcome to The Place, a beautiful retreat in the heart of Apple Valley. Enjoy stunning views, modern amenities, and a cozy atmosphere. This spot features a fully equipped kitchen, spacious living area, high-speed WiFi, and a private patio perfect for relaxing. Ideal for families or couples looking for a peaceful getaway.',
        price: 250
      },
      {
        ownerId: 1,
        address: '234 Spot Ave',
        city: 'Rocky Mount',
        state: 'North Carolina',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Oasis',
        description: 'The Oasis is your perfect escape in Rocky Mount. This charming spot offers a serene environment with a lush garden, comfortable beds, and a refreshing swimming pool. Guests can enjoy a fully stocked kitchen, barbecue grill, and a cozy fireplace. It\'s the perfect spot for relaxation and unwinding from the daily hustle.',
        price: 200
      },
      {
        ownerId: 2,
        address: '345 Spot Ave',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Cool Place',
        description: 'Experience luxury at The Cool Place in Phoenix. This high-end spot boasts modern architecture, a rooftop terrace with panoramic views, a private pool, and a home theater. Perfect for those looking to indulge in comfort and style, with easy access to local attractions and nightlife.',
        price: 600
      },
      {
        ownerId: 2,
        address: '456 Spot Ave',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Great Place',
        description: 'Discover The Great Place in Los Angeles, a perfect blend of luxury and convenience. This spacious spot features a gourmet kitchen, large living spaces, a game room, and a beautiful garden. Located close to top attractions, it\'s ideal for exploring the city while enjoying a comfortable stay.',
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
        description: 'The Cheap Place offers unbeatable value in Las Vegas. Enjoy a clean and cozy stay with essential amenities like a comfortable bed, free WiFi, and a convenient kitchenette. Perfect for budget travelers looking to explore the city without breaking the bank.',
        price: 34
      },
      {
        ownerId: 3,
        address: '678 Spot Ave',
        city: 'Burbank',
        state: 'California',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Okay Place',
        description: 'Stay at The Okay Place in Burbank for a comfortable and affordable experience. This spot features basic amenities including a cozy bed, a small kitchenette, and free parking. It\'s a great option for those seeking convenience and practicality during their visit.',
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
