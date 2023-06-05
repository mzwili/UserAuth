const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();


// const bcrypt = require("bcrypt");//password encryptor
// const users = [];

app.use(bodyParser.urlencoded({extended: false}));

//landing page router
app.get('/', (req, res) => {
    res.render("index.ejs")
});

//home page router
app.get('/admin', (req, res) => {
    res.render("admin.ejs")
});

//about page router
app.get('/about', (req, res) => {
    res.render("about.ejs")
});

//register page router
app.get('/register', (req, res) => {
    res.render("register.ejs")
});

//home page router
app.get('/login', (req, res) => {
    res.render("login.ejs")
});

app.listen(3000);