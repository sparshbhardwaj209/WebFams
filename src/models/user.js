const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address", value);
        }
      },
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong", value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      validate(value) {
        if (value < 18) {
          throw new Error("Age must be greater than 18");
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender can be 'male', 'female', or 'others' only");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNi9kQ-9UyVu9-YrrtvRHuRckHgMtpIKwAuQ&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid PhotoURL", value);
        }
      },
    },
    about: {
      type: String,
      default: "Hey there! I am using WebFams",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.ValidatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = this.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
