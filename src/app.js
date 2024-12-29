const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 7777;

app.post("/signup", async (req, res)=>{
    const user = new User({
        firstName: "sparsh",
        lastName: "pandit",
        emailId: 'sparsh@pandit.com',
        password: 'pandat123',
        gender: "male"
    });
    try{
        await user.save();
        res.send("User created successfully");
    }catch(err){
        console.log("User not created", err.message);
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
