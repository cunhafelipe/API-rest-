const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectToDatabase = require("./database/connect.js");
const logger = require("./middlewares/logs/logger");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cors());
server.options("*", cors());

server.use(morgan("dev"));

server.use("/", require("./routes/users"));
server.use("/", require("./routes/client"));

server.all("*", (req, _res, next) => {
  next(new Error(`Erro ao encontrar a rota ${req.originalUrl} neste servidor`));
});

const PORT = 3000;

connectToDatabase()
  .then(() => {
    server.listen(PORT, () => {
      logger.info(`Servidor rodando na porta: ${PORT}`);
    });
  })
  .catch((error) => {
    logger.warn(error);
  });
