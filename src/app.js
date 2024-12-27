const express = require('express');
const app = express();
const PORT = 7777;


app.get('/user', (req, res) => {
    res.send('Data GET request');
})

// works with all the routes having a
// app.get('/a', (req, res) => {
//     res.send({name: 'Sparsh', age: 24});
// })

// works with all the routes having abc or abbc or abbbc
// app.get('/ab+c', (req, res) => {
//     res.send({name: 'Sparsh', age: 24});
// })

// works with all the routes having abd or ad (b is optional to include)
// app.get('/ab?d', (req, res) => {
//     res.send({name: 'Sparsh', age: 24});
// })


// works with all the routes having abcd or ad (bc is optional to include)
// app.get('/a(bc)?d', (req, res) => {
//     res.send({name: 'Sparsh', age: 24});
// })

// works with all the routes having abcd or abcbcd or abcbcbcd (bc can be multiple)
// app.get('/a(bc)*d', (req, res) => {
//     res.send({name: 'Sparsh', age: 24});
// })

// works with all the routes having abcd or absparshcd or abxyzcd (anything can be there in between ab and cd)
// app.get('/ab*cd', (req, res) => {
//     res.send({name: 'Sparsh', age: 24});
// })

// works with all the routes having a/ or a/b or a/c
// app.get('/a/', (req, res) => {
//     res.send({name: 'Sparsh', age: 24});
// })

// works with will the words ending with fly
// app.get('/*fly$/', (req, res) => {
//     res.send({name: 'Sparsh', age: 24});
// })

app.listen(PORT, () =>{
    console.log("Server is running on port 7777");
});