const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 7777;
const { signUpValidation } = require("./utils/validate.js");
const bcrypt = require("bcrypt");

app.use(express.json());

// Signup API - to create a new user
app.post("/signup", async (req, res) => {
  // never trust the req.body, always validate it

  try {
    //validating the request body
    signUpValidation(req);

    const { firstName, lastName, emailId, password } = req.body;

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    // saving the user to the database
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("User not created " + err.message);
  }
});

app.post("/login", async(req, res)=>{
  try{
    const {emailId, password} = req.body;
    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid){
      res.send("Login successfull");
    }else{
      throw new Error("Invalid credentials");
    }
  }catch(err){
    res.status(400).send("ERROR: " + err.message);
  }
})

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
app.delete("/users", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).send("Something went wrong, can't get the user!");
  }
});

//update user API
app.patch("/users/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "age", "gender"];
    const isUpdateAllowed = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    });
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
      // return res.status(400).send("Invalid updates!");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills should not be more than 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Updataion failed " + err.message);
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
