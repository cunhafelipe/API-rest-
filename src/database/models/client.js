const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ClientModel = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    minlenght: 6,
  },
  cpf: {
    type: String,
    require: true,
    unique: true,
  },
});

ClientModel.plugin(uniqueValidator);

const Client = mongoose.model("Client", ClientModel);

module.exports = Client;
