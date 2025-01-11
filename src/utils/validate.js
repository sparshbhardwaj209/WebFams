const validator = require("validator");

const signUpValidation = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName){
        throw new Error("Name is not valid");
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
    }
}

module.exports = {signUpValidation};