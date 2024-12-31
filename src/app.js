const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());

app.post("/signup", async (req, res) => {
  // creating an instance of user model and getting the body data from the request
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    console.log("User not created", err.message);
  }
});

// get users by emailId
app.get("/users", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const users = await User.find({ emailId: userEmail });
    if (!users) {
      res.status(404).send("User not found");
    }
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong, can't get the user!");
  }
});

// Feed API
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
    if (!users) {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send("Something went wrong, can't get the user!");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection is successful");
    app.listen(PORT, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
