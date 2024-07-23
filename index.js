const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
//Router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

// Rest Object
const app = express();

// Port
const PORT = 8000;

// MongoDB Connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use(express.static("build"));

// Listen
app.listen(PORT, () => {
    console.log(`Server started at: http://127.0.0.1:${PORT}`)
})
