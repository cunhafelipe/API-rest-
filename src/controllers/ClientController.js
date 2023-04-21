const Client = require("../database/models");

class ClientController {
  async createClient(request, response) {
    try {
      const client = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        cpf: request.body.cpf,
      };

      const checkExistsEmail = await Client.findOne({ email: client.email });
      const checkExistsCpf = await Client.findOne({ cpf: client.cpf });

      if (checkExistsEmail || checkExistsCpf) {
        response.status(400).json("E-mail ou CPF ja cadastrados");
      }

      if (client.password.length <= 5) {
        response.status(400).json("Minímo de 6 digítos");
      }

      if (!client) {
        response.status(400).json("Preencha os campos");
      }

      return await Client.create(client).then((clientCreate) => {
        response.status(200).json(clientCreate);
      });
    } catch (error) {
      response.status(500).send(error.message);
    }
  }

  async updateClient(request, response) {
    try {
      const client = {
        body: request.body,
        email: request.body.email,
        cpf: request.body.cpf,
      };

      if (client.email !== undefined || client.cpf !== undefined) {
        return response
          .status(400)
          .json("Erro: atualize somente name ou password");
      }

      const update = await Client.findOneAndUpdate(client.email, client.body);

      response.json(update);
    } catch (error) {
      logger.error(error);
    }
  }

  async findClients(_request, response) {
    try {
      const client = await Client.find();
      response.json(client);
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteClient(request, response) {
    try {
      const id = request.body.id;
      const findClientById = await Client.findById(id);

      if (!findClientById) {
        return response.json({ message: "Não há registros" });
      }

      const userDeleted = await Client.findByIdAndDelete(id);
      return response.json({
        message: "Cliente excluído com sucesso",
        userDeleted,
      });
    } catch (error) {
      logger.error(error);
    }
  }

  async me(request, response) {
    const findMe = await Client.findById(request.query.id);
    if (!findMe) {
      response.status(400).send("Cliente nao encontrado");
    }
    return response.status(200).json(findMe);
  }
}

module.exports = new ClientController();
