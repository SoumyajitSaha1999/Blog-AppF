const express = require("express");
const { getAllBlogsController, createBlogController, updateBlogController, deleteBlogContoller, getBlogByIdController, userBlogController } = require("../controllers/blogControllers");

// Router Object
const router = express.Router();

// Get all blogs || GET
router.get("/all-blogs", getAllBlogsController);

// Create blog || POST
router.post("/create-blog", createBlogController);

// Update blog || PUT
router.put("/update-blog/:id", updateBlogController);

// Delete blog || DELETE
router.delete("/delete-blog/:id", deleteBlogContoller);

// Single blog details || GET
router.get("/get-blog/:id", getBlogByIdController);

// Single user blog details || GET
router.get("/user-blog/:id", userBlogController);

module.exports = router;
