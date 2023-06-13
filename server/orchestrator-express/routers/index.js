const router = require("express").Router();
const moviesRouter = require("./movies-router");
const usersRouter = require("./users-router");

router.use("/movies", moviesRouter);
router.use("/users", usersRouter);

module.exports = router;
