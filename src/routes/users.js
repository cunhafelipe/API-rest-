const router = require("express").Router();
const User = require("../models/User");

router
  .route("/users")
  .post(async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .get(async (_req, res) => {
    try {
      const user = await User.find();
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/user")
  .get(async (req, res) => {
    try {
      const email = await User.findOne({ email: req.body.email });
      res.json(email);
    } catch (error) {
      console.log(error);
    }
  })
  .patch(async (req, res) => {
    try {
      const update = await User.findOneAndUpdate({
        password: req.body.password,
      });
      res.json(update);
    } catch (error) {
      console.log(error);
    }
  });

router.route("/users/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
