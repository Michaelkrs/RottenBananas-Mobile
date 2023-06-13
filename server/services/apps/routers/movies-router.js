const Controller = require("../controllers/movies-controller");
const router = require("express").Router();

router.get("/", Controller.readMovies);
router.post("/", Controller.addMovie);
router.delete("/:id", Controller.deleteMovie);
router.put("/:id", Controller.editMovie);
router.get("/:id", Controller.readMovieDetail);

module.exports = router;
