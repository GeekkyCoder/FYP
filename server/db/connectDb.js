const mongoose = require('mongoose');
require('dotenv');

mongoose.connection.on('open', () => {
  console.log('connected to mongodb successfully!!!');
});

async function connectDb(url) {
  await mongoose.connect(url);
}

module.exports = {
  connectDb,
};
