const validator = require("validator");

const signUpValidation = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName) {
    throw new Error("Name is not valid");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const validateEditProfile = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "gender",
    "age",
    "photoUrl",
    "about",
    "skills",
  ];

  const isEditFieldAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditFieldAllowed;
};

const validatePassword = (req) => {
  const { newPassword } = req.body;
  if (!validator.isStrongPassword(newPassword)) {
    return false;
  }
  return true;
};

module.exports = { signUpValidation, validateEditProfile };
