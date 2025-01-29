const express = require("express");
const { userAuth } = require("../middlewares/auth.js");
const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;

  console.log("sending connection request");
  res.send(user.firstName + " sent you a connection request!");
});

module.exports = requestRouter;
