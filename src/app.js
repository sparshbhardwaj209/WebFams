const express = require('express');
const app = express();
const PORT = 7777;


app.use('/test', (req, res) => {
    res.send('hello sparsh ');
})

app.use('/helo', (req, res) => {
    res.send('helo helo helo');
})


app.use('/', (req, res) => {
    res.send('hello world from the dashboard');
})

app.listen(PORT, () =>{
    console.log("Server is running on port 7777");
});