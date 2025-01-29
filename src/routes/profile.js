const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");

// API to get the user profile
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res
      .status(500)
      .send("Something went wrong, can't get the user!" + err.message);
  }
});

module.exports = profileRouter;
