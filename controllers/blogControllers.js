const mongoose = require("mongoose");
const blogModel = require("../models/blogModels");
const userModel = require("../models/userModel");

// Get all blogs || GET
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(400).send({
        message: "No blogs found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "All blogs list",
      totalblogs: blogs.length,
      success: true,
      blogs,
    });

  } catch (error) {
    console.log("Error Occurred", error);
    return res.status(500).send({
      message: "Error while getting blogs",
      success: false,
      error,
    });
  }
};



// Create blog || POST
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        message: "Please Provide ALl Fields",
        success: false,
      });
    }

    const exisitingUser = await userModel.findById(user);
    if (!exisitingUser) {
      return res.status(404).send({
        message: "unable to find user",
        success: false,
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();

    return res.status(201).send({
      message: "Blog Created!",
      success: true,
      newBlog,
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error WHile Creting blog",
      success: false,
      error,
    });
  }
};



// Update blog || PUT
exports.updateBlogController = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const { id } = req.params;
    const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
    return res.status(200).send({
      message: "Blog Updated!",
      success: true,
      blog,
    });

  } catch (error) {
    console.log("Error Occurred", error);
    return res.status(400).send({
      message: "Error while updating blog",
      success: false,
      error,
    });
  }
};



// Delete blog || DELETE
exports.deleteBlogContoller = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
    // await blog.user.blogs.pull(blog);
    // await blog.user.save();
    return res.status(200).send({
      message: "Blog Deleted!",
      success: true,
    });

  } catch (error) {
    console.log("Error Occurred", error);
    return res.status(400).send({
      message: "Error while deleting blog",
      success: false,
      error,
    });
  }
};



// Single blog details || GET
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found with this ID",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Fetch single blog successfully",
      success: true,
      blog,
    });

  } catch (error) {
    console.log("Error Occurred", error);
    return res.status(400).send({
      message: "Error while getting single blog",
      success: false,
      error,
    });
  }
};



// Single user blog details || GET
exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        message: "Blogs not found with this ID",
        success: false,
      });
    }

    return res.status(200).send({
      message: "User blogs",
      success: true,
      userBlog,
    });
    
  } catch (error) {
    console.log("Error Occurred", error);
    return res.status(400).send({
      message: "Error in single user blog",
      success: false,
      error,
    });
  }
};
