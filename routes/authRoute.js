const express = require("express");
const {
  createUser,
  loginUser,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
} = require("../controller/userController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getallUser);
router.get("/:id", getaUser);
router.delete("/:id", deleteaUser);
router.put("/:id", updatedUser);
module.exports = router;
