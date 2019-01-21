const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const app = express();

require('./passport')(passport);

mongoose.connect('mongodb://abderrahman:abderrahman123@ds121624.mlab.com:21624/apro');
//mongoose.connect('mongodb://localhost:27017/apro');
const port = process.env.PORT || 8080;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(expressValidator());

app.use(session({
    secret: 'aedsbdfooirrekmdlf5485f',
    resave: false,
    saveUninitialized: true,
   
  }));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
// Routes 
app.use(require('./routes'));

app.use(function (req, res) {
    res.render('404');
});
app.listen(port);

