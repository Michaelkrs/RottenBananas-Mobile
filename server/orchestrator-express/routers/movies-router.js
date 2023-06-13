const router = require("express").Router();
const Controller = require("../controllers/movies-controller");

router.get("/", Controller.getMovies);
router.post("/", Controller.postMovie);
router.get("/:id", Controller.getMovieDetail);
router.put("/:id", Controller.editMovie);
router.delete("/:id", Controller.deleteMovie);

module.exports = router;
