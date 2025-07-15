const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const validateMongodbId = require("../utils/validateMongodbId");

// Function to create a new blog
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

// Function to update an existing blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title && req.body.description) {
      const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedBlog);
    } else {
      res.status(400).json({ message: "Title and description are required" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Function to get a blog by ID & increment view count
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getBlog = await Blog.findById(id);
    await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

// get all blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createBlog, updateBlog, getBlog, getAllBlogs };
