const User = require("../models/User");

module.exports = {
  async updateUser(request, response) {
    try {
      const update = await User.findOneAndUpdate(
        { email: request.body.email },
        {
          password: request.body.password,
        }
      );
      response.json(update);
    } catch (error) {
      console.log(error);
    }
  },

  async readUser(request, response) {
    try {
      const email = await User.findOne({ email: request.body.email });
      response.json(email);
    } catch (error) {
      console.log(error);
    }
  },

  async createUser(request, response) {
    try {
      const user = await User.create(request.body);
      response.status(201).json(user);
    } catch (error) {
      response.status(500).send(error.message);
    }
  },

  async findUsers(_request, response) {
    try {
      const user = await User.find();
      response.json(user);
    } catch (error) {
      console.log(error);
    }
  },

  async deleteUser(request, response) {
    try {
      const id = request.query.id;
      const user = await User.findByIdAndRemove(id);
      response.json(user);
    } catch (error) {
      console.log(error);
    }
  },
};
