const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 7777;

app.use(express.json());

// Signup API - to create a new user
app.post("/signup", async (req, res) => {
  // creating an instance of user model and getting the body data from the request
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    // console.log("User not created" +  err);
    res.status(400).send("User not created " + err.message);
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

// Feed API - to get all the users
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

// delete user API using ID
app.delete("/users", async (req, res)=>{
  try{
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    if(!user){
      res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  }catch (err) {
    res.status(500).send("Something went wrong, can't get the user!");
  }
})

//update user API
app.patch("/users", async (req, res)=>{
  const userId = req.body.userId;
  const data = req.body;
  try{
    await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully");
  }catch (err) {
    res.status(500).send("Updataion failed " + err.message );
  }
})

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
