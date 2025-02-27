const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { validateEditProfile } = require("../utils/validate");

// API to get the user profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res
      .status(500)
      .send("Something went wrong, can't get the user!" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid fields to update");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((keys) => {
      loggedInUser[keys] = req.body[keys];
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile is updated Successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res
      .status(400)
      .send("Something went wrong, can't Update the user!" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const loggedInUser = req.user;
    const isPasswordStrong = user.ValidatePassword(req);
    if(!isPasswordStrong) {
      throw new Error("Password is not strong");
    } 
    loggedInUser.password = newPassword;
    loggedInUser.save();
  } catch (err) {
    res
      .status(400)
      .send("Something went wrong, can't Update the user!" + err.message);
  }
});

module.exports = profileRouter;
