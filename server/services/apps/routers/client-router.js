const Controller = require("../controllers/client-controller");
const router = require("express").Router();

router.get("/movies", Controller.readMovies);
router.get("/movies/:id", Controller.readMovieDetail);

module.exports = router;
