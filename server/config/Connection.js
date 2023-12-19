const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log(
      'Database Connected',
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log('Error is: ' + error);
    process.exit(1);
  }
};

module.exports = connectDB;
