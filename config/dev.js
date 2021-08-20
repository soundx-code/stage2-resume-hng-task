const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwtKey: "123-456-789-098",
    pubKey: "098-765-432-101",
  };
  