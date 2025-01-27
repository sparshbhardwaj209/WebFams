const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token, please login again");
    }
    const decodedObj = await jwt.verify(token, JWT_SECRET);
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found, please login again");
    }

    req.user = user;
    next();
  } catch (err){
    res.status(404).send("Error: " + err.message);
  }
};

module.exports = {
  userAuth,
};
