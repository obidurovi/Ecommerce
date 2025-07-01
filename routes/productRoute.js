const express = require("express");
const {
  createProduct,
  getAProduct,
  getAllProduct,
  updateProduct,
} = require("../controller/productController");
const router = express.Router();

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.get("/:id", getAProduct);
router.get("/", getAllProduct);

module.exports = router;
