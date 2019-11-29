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
var server = require("http").Server(app);
var io = require("socket.io")(server);
/**Define server running port */
var PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/** Handle the front end */
app.use(express.static(path.join(__dirname, "client", "build")))

/**Create connection to mongoDB database */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('[backend] Database is connected'))
  .catch(err => console.log('[backend] Database connection Error ' + err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Initialize to use passport middleware inside app */
app.use(passport.initialize());
/** Import passport configiration for jwt token authentication */
require("./config/passport")(passport);
/** Routes to accesst the backend */
app.use('/users', usersRouter);
app.use('/post', indexRouter);
app.use('/request', ondemandRouter);
/** Home page route to access the site */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
/** Use of Socket.io formessaging service*/
io.on("connection", socket => {
  socket.on("chat message", ({from,to,msg}) => {
    var emitTO = to + "message";
    io.emit(emitTO, {from,msg});
  });
});

server.listen(PORT, function () {
  console.log('[backend] Server is running on Port:', PORT);
});
