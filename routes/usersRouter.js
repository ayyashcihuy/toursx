const usersController = require("../controllers/usersController");

const usersRouter = require("express").Router();

usersRouter
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser);
usersRouter
  .route("/:id")
  .get(usersController.getSingleUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = usersRouter;
