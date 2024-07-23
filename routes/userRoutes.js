const express = require("express");
const { getAllUser, registerController, loginController } = require("../controllers/userControllers");

// Router Object
const router = express.Router();

// Get all user || GET
router.get("/all-users", getAllUser)

// Create user or Register user || POST
router.post("/register", registerController)

// Login || POST
router.post("/login", loginController)

module.exports = router;
