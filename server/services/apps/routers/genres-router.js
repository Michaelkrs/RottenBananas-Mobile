const Controller = require("../controllers/genres-controller");
const router = require("express").Router();

router.get("/", Controller.readGenres);
router.post("/add", Controller.addGenre);
router.put("/edit/:id", Controller.editGenre);
router.delete("/delete/:id", Controller.deleteGenre);
router.get("/:id", Controller.readOneGenre);

module.exports = router;
