const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose
  .connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => {
    console.log('MONGO CONNECTION OPEN!!!');
  })
  .catch((err) => {
    console.log('OH NO MONGO CONNECTION ERROR!!!!');
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // YOUR USER ID
      author: '63081197ab3af112a8889abe',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dejhmgbbc/image/upload/v1661609660/YelpCamp/nciy1q94ap2tj4nd6m5h.jpg',
          filename: 'YelpCamp/nciy1q94ap2tj4nd6m5h',
        },
        {
          url: 'https://res.cloudinary.com/dejhmgbbc/image/upload/v1661609661/YelpCamp/kigiitbz64vjmzp0ekne.jpg',
          filename: 'YelpCamp/kigiitbz64vjmzp0ekne',
        },
      ],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas fugiat culpa enim repellat nostrum corporis deleniti beatae aut. Molestiae dolore atque nobis amet modi nulla eaque ex fugit omnis illum?',
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
