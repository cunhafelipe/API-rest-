const mongoose = require("mongoose");
const logger = require("../middlewares/logs/logger");
require("dotenv").config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@exerafa2.njdbd4g.mongodb.net/?retryWrites=true&w=majority`
    );
    logger.info("Conectado ao banco de dados");
  } catch (error) {
    logger.warn(error);
  }
};

module.exports = connectToDatabase;
