const router = require("express").Router();
const ClientController = require("../controllers/ClientController");

router.route("/clients").get(ClientController.findClients);

router
  .route("/client")
  .get(ClientController.me)
  .post(ClientController.createClient)
  .patch(ClientController.updateClient)
  .delete(ClientController.deleteClient);

module.exports = router;
