const express = require("express");
const app = express();
const PORT = 7777;

const {authAdmin, authUser} = require("./middlewares/auth");

app.get('/user/userLogin', (req, res)=>{
    res.send("user login successfully");
})

app.get("/user/userData", authUser, (req, res)=>{
    res.send("User is verified successfully");
})

app.get("/admin/userData", authAdmin, (req, res) => {
  res.send("User data sent successfully");
});

app.get("/admin/deleteUser", authAdmin, (req, res) => {
  res.send("User deleted successfully");
});

app.listen(PORT, () => {
  console.log("Server is running on port 7777");
});
