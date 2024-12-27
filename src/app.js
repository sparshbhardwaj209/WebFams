const express = require('express');
const app = express();
const PORT = 7777;


app.get('/user', (req, res) => {
    res.send('Data GET request');
})

app.post('/user', (req, res)=> {
    res.send('Data POST request');
})

app.delete('/user', (req, res)=>{
    res.send('Data Delete request');
})

app.patch('/user', (req, res)=>{
    res.send("Data Patch request");
})

app.put('/user', (req, res)=>{
    res.send('Data PUT request');
})

app.use('/test', (req, res) => {
    res.send('hello sparsh ');
})

app.listen(PORT, () =>{
    console.log("Server is running on port 7777");
});