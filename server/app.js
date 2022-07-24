const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config({ path: './config.env' });

require('./db/conn');

app.use(express.json());

// link the router files to make route easily
app.use(require('./router/auth'));

const PORT = process.env.PORT;


// Middleware

// const middleware = (req, res, next) => {
//     console.log(`Hello my Middleware`);
//     next();
// }

// app.get('/about', middleware, (req, res) => {
//     console.log(`Hello my About`);
//     res.send(`Hello About world from server`);
// })

// app.get('/contact', (req, res) => {
//     // res.cookie("Test", 'thapa')
//     res.send(`Hello Contact world from server`);
// })

app.get('/signin', (req, res) => {
    res.send(`Hello Login world from server`);
})

app.get('/signup', (req, res) => {
    res.send(`Hello Registration world from server`);
})

app.listen(PORT, () => {
    console.log(`server is running at port no. ${PORT}`)
})