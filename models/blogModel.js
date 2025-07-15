const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
      default:
        "https://imgs.search.brave.com/SFiG_Vj5sGHii2jN8pvQzdmIOWuwn5chuTlHMiTSpMg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvd2Vic2l0/ZS11bmRlci1tYWlu/dGVuYW5jZS1pbGx1/c3RyYXRpb24tZG93/bmxvYWQtaW4tc3Zn/LXBuZy1naWYtZmls/ZS1mb3JtYXRzLS13/ZWJwYWdlLXdlYi1k/ZXNpZ24tZ3JhcGhp/Yy1pbnRlcmZhY2Ut/YnVzaW5lc3MtcGFj/ay1wZW9wbGUtaWxs/dXN0cmF0aW9ucy0z/NjEwNzgyLnBuZz9m/PXdlYnA",
    },
    author: {
      type: String,
      default: "Anonymous",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
