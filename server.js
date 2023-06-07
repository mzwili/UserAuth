
const express = require("express");
const mysqldb = require("mysql2");
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

app.post("/register", (req, res) => {
    //get form data from request body
    const {name, username, email, password} = req.body;

    const dbconnect = mysqldb.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'usersdb',
        password: 'fire123',
    });

    dbconnect.query(
        "INSERT INTO userdata (name, username, email, password) VALUES (?,?, ?,?);", [name, username, email, password],
        (error, result) => {
            if (error) {
                console.error('Error storing data: ', error)
                res.sendStatus(500);
            }
            console.log("Data stored successfully: ", result)
            res.redirect("/login");
        }
    );
    
});

app.post("/login", (req, res) => {
    //get form data from request body
    const {username, password} = req.body;

    const dbconnect = mysqldb.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'usersdb',
        password: 'fire123',
    });

    dbconnect.query(
        "SELECT * FROM userdata WHERE username = ? AND password = ?;",[username, password],
        (error, result) => {

            if (error) console.error('Error storing data: ', error);
            if(!result.length > 0) res.send("Wrong password or username")
            // result.forEach((user) => {console.log(user)})
            res.redirect("/admin");
        }
    );
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);