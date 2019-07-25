var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require("passport");

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var PORT = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log('Database is connected'))
  .catch(err => console.log('MongoDB connection Error ' + err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());

require("./config/passport")(passport);

app.use('/users', usersRouter);
app.use('/post', indexRouter);

app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT);
});
