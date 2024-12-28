const express = require("express");
const app = express();
const PORT = 7777;

app.get('/user/userLogin', (req, res, next)=>{
    try{
        console.log('Error is about to come');
        throw new Error("I am a error");
    }catch(err){
        console.log(err);
        res.status(500).send("Some error occured");
    }
})

// wildcard handler for all the routes
app.use('/', (err, req, res, next)=>{
    if(err){
        res.status(500).send("Internal server error hai bhai, contact pandit ji");
    }
})

app.listen(PORT, () => {
  console.log("Server is running on port 7777");
});
