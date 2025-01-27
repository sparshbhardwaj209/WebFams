const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 7777;
const JWT_SECRET = process.env.JWT_SECRET;
const { signUpValidation } = require("./utils/validate.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

// Signup API - to create a new user
app.post("/signup", async (req, res) => {
  try {
    signUpValidation(req);
    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.ValidatePassword(password);
    
    if (isPasswordValid) {
      //creating a JWT token
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
      });
      res.send("Login successfull");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// API to get the user profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res
      .status(500)
      .send("Something went wrong, can't get the user!" + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  console.log("sending connection request");
  res.send(user.firstName + " sent you a connection request!");
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
