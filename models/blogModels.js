const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },

    // Relationship maintain between user and blog
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user ID is required"],
    },
  },
  { timestamps: true }
);

const blohModel = mongoose.model("Blog", blogSchema);

module.exports = blohModel;
