const express = require("express");
const {
  createUser,
  loginUser,
  getallUser,
} = require("../controller/userController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getallUser);
module.exports = router;
