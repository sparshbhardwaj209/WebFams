const express = require("express");
const app = express();
const PORT = 7777;

app.get('/user', (req, res) => {
    res.send('Data GET request');
})

// practing query parameters
app.use('/user/:userid/:password', (req, res)=>{
    console.log(req.query);
    console.log(req.params);
    res.send('Request sent successfully');
});

// practice multiple middlewares and request handlings
app.use("/user", [
  (req, res, next) => {
    console.log("Response 1 log");
    // res.send("Response 1");
    next();
  },
  (req, res, next) => {
    console.log("Response 2 Log");
    // res.send("Response 2");
    next();
  },
  (req, res, next) => {
    console.log("Response 3 log");
    // res.send("Response 3");
    next();
  },
  (req, res, next) => {
    console.log("Response 4 log");
    // res.send("Response 4");
    next();
  },
  (req, res, next) => {
    console.log("Response 5 log");
    res.send("Response 5");
    next();
  }]
);

app.listen(PORT, () => {
  console.log("Server is running on port 7777");
});
