const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(
      "mongodb+srv://ssoumyajit245:kOPO1pwYdbxIokfe@cluster0.qk6hk3v.mongodb.net/Blog_App_Final?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log(`MongoDB Connected: ${mongoose.connection.host}`))
    .catch((err) => console.log("MongoDB Error", err));
};

module.exports = connectDB;