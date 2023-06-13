const router = require("express").Router();
const Controller = require("../controllers/users-controller");

router.get("/", Controller.getUsers);
router.get("/:id", Controller.getUserById);
router.post("/", Controller.addUser);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
