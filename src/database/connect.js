const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@exerafa2.njdbd4g.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Conectado ao banco de dados");
  } catch (error) {
    console.log(`Erro: `, error);
  }
};

module.exports = connectToDatabase;
