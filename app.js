// === MODULES === //
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const mysql = require('mysql');
const sync = require('sync-request');

const mysql_c = require('./mysql.json');

const app = express();

// === MYSQL CONNECTION === //
const sqlcon = mysql.createConnection({
    host: mysql_c.host, 
    user: mysql_c.user, 
    password: mysql_c.password,
    database: mysql_c.database,
    supportBigNumbers: true,
    bigNumberString: true
})

sqlcon.connect(e => {
    if(e) throw e;
    console.log("Połączono prawodłowo z bazą danych.");
})

// === LOADING PAGE === //

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(flash());

const router = express.Router();

// === HOME PAGE === //
router.get('/', (req, res) => {
    res.render('home');
});

app.use('/', router);

module.exports = app;