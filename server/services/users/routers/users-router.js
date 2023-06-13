const express = require("express");
const router = express.Router();

const Controller = require("../controllers/user-controller");

router.get("/", Controller.findAllUsers);
router.post("/", Controller.createUser);
router.get("/:id", Controller.findUserById);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
