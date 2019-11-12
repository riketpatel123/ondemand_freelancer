var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require("passport");
var path = require('path');

require('dotenv').config();

var indexRouter = require('./routes/index');
var ondemandRouter = require('./routes/ondemand');
var usersRouter = require('./routes/users');

var app = express();
var PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Handle the front end
app.use(express.static(path.join(__dirname,"client","build")))

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('[backend] Database is connected'))
  .catch(err => console.log('[backend] Database connection Error ' + err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());

require("./config/passport")(passport);

app.use('/users', usersRouter);
app.use('/post', indexRouter);
app.use('/request', ondemandRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,"client","build","index.html"));
});

app.listen(PORT, function () {
  console.log('[backend] Server is running on Port:', PORT);
});
