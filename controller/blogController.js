const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const validateMongodbId = require("../utils/validateMongodbId");

const createBlog = asyncHandler(async (req, res) => {
  try {
    if (req.body.title && req.body.description) {
      const newBlog = await Blog.create(req.body);
      res.json(newBlog);
    } else {
      res.status(400).json({ message: "Title and description are required" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createBlog };
