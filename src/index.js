const express = require("express");
const connectToDatabase = require("./database/connect.js");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/", require("./routes/users"));

const PORT = 3000;

connectToDatabase()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Servidor rodando na porta: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
