const { User, Client } = require("../database/models");
const logger = require("../middlewares/logs/logger");

const mockUserLogged = {
  id: "12345576128372hfhsglsng-sbdsfjdsfsdfjh29",
  name: "Felipe Cunha",
  admin: false,
};

class UserController {
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
        return response
          .status(400)
          .json("Os dados não podem ser atualizados, apenas com chamado");
      }

      const update = await User.findOneAndUpdate(user.email, user.body);

      response.json(update);
    } catch (error) {
      logger.error(error);
    }
  }

  async readUser(request, response) {
    try {
      const email = await User.findOne({ email: request.body.email });
      response.json(email);
    } catch (error) {
      logger.error(error);
    }
  }

  async createUser(request, response) {
    try {
      const user = {
        firstName: request.body.firstName,
        email: request.body.email,
        password: request.body.password,
        admin: request.body.admin,
      };

      const checkExists = await User.findOne({ email: user.email });

      if (mockUserLogged && mockUserLogged.admin !== true) {
        response.status(401).json("Sem acesso suficiente");
      }

      if (checkExists) {
        response.status(400).send("E-mail ja criado");
      }

      if (user.password.length <= 6) {
        response.status(400).send("Senha pequena");
      }

      if (!user) {
        response.status(400).send("Dados vazios");
      }

      return await User.create(user).then((userCreate) => {
        response.status(200).json(userCreate);
      });
    } catch (error) {
      response.status(500).send(error.message);
    }
  }

  async findUsers(_request, response) {
    try {
      const user = await User.find();
      response.json(user);
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteUser(request, response) {
    try {
      const id = request.body.id;

      const findUserById = await User.findById(id);

      if (!findUserById) {
        return response.json({ message: "Nao existem registros" });
      }

      if (mockUserLogged && mockUserLogged.admin === true) {
        await User.findByIdAndRemove(findUserById).then((userDeleted) => {
          return response.json(userDeleted);
        });
      } else {
        return response
          .status(401)
          .json({ message: "Voce nao tem permissao suficiente" });
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async findClients(_request, response) {
    try {
      const clients = await Client.find();
      response.json(clients);
    } catch (error) {
      logger.error(error);
      response.status(500).json({ message: "Erro ao buscar clientes" });
    }
  }
}

module.exports = new UserController();
