const User = require("../models/User");
const userSchema = require("../middleware/joi");
const createValidator = require("../helpers/validate");

// let validator = () => createValidator(userSchema);

module.exports = {
  async updateUser(request, response) {
    try {
      const user = {
        body: request.body,
        email: request.body.email,
        admin: request.body.admin,
      };

      // if (!user.email) return response.status(400).send("Email vazio");

      if (!user) throw Error("Error XyZ");

      if (user.admin !== undefined || user.email !== undefined) {
        response
          .status(400)
          .json("Os dados não podem ser atualizados, apenas com chamado");
      }

      const update = await User.findOneAndUpdate(user.email, user.body);

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
      const user = {
        firstName: request.body.firstName,
        email: request.body.email,
        password: request.body.password,
        admin: request.body.admin,
      };

      const checkExists = await User.findOne({ email: user.email });

      if (checkExists) {
        response.status(400).send("E-mail ja criado");
      }

      if (user.password.length <= 6) {
        response.status(400).send("Senha pequena");
      }

      if (!user) {
        response.status(400).send("Dados vazios");
      }

      if (user.admin === false) {
        response
          .status(401)
          .json("Você não tem acesso suficiente para criar um usuário!");
      }

      const finalResponse = await User.create(user);
      response.status(201).json(finalResponse);
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

      const userAdmin = {
        admin: request.body.admin,
      };

      if (userAdmin.admin !== true) {
        response
          .status(401)
          .json("Você não tem permissão para deletar um usuário");
      }

      response.json(user);
    } catch (error) {
      console.log(error);
    }
  },
};
