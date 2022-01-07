const toursRouter = require("./toursRouter");
const usersRouter = require("./usersRouter");

const router = require("express").Router();

router.use("/tours", toursRouter);
router.use("/users", usersRouter);

module.exports = router;
