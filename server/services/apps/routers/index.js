const errorHandler = require("../helpers/error-handler");
const moviesRouter = require("./movies-router");
const genresRouter = require("./genres-router");
const clientRouter = require("./client-router");

const router = require("express").Router();

router.use("/movies", moviesRouter);
router.use("/genres", genresRouter);
router.use("/client", clientRouter);

router.use(errorHandler);

module.exports = router;
