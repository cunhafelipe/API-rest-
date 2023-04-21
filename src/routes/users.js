const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.route("/users").get(UserController.findUsers);

router
  .route("/user?")
  .post(UserController.createUser)
  .get(UserController.readUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

router.get("/clients", UserController.findClients);

module.exports = router;
