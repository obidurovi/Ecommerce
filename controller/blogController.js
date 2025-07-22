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

// delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    await Blog.findByIdAndDelete(id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

// Like a blog
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;

  if (!blogId) {
    return res.status(400).json({ message: "Blog ID is required" });
  }

  try {
    // Validate MongoDB ID
    try {
      validateMongodbId(blogId);
    } catch (error) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }

    // Find the blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check user authentication
    const loginUserId = req?.user?._id;
    if (!loginUserId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Initialize arrays if they don't exist
    if (!blog.likes) blog.likes = [];
    if (!blog.disLikes) blog.disLikes = [];

    // Check if already liked/disliked
    const alreadyLiked = blog.likes.find(
      (id) => id.toString() === loginUserId.toString()
    );

    const alreadyDisliked = blog.disLikes.find(
      (id) => id.toString() === loginUserId.toString()
    );

    // Process like/dislike actions
    if (alreadyDisliked) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { disLikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      return res.json(updatedBlog);
    }

    if (alreadyLiked) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      return res.json(updatedBlog);
    } else {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      return res.json(updatedBlog);
    }
  } catch (error) {
    console.error("Like blog error:", error);
    return res.status(500).json({
      message: "Error processing like action",
      error: error.message,
    });
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
};
