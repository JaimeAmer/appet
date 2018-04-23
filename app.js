var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require("express-validator");
var config = require('./config');


/*SESIONES*/
var session = require("express-session");
var mysqlSession = require("express-mysql-session");
var MySQLStore = mysqlSession(session);

const sessionStore = new MySQLStore({
    host: config.mysqlConfig.host,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
});

const middlewareSession = session ({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore    
});


//Rutas para los roles 
var general = require('./routes/general');
var invitados = require('./routes/invitados');
var protectoras = require('./routes/protectoras');
var admin = require('./routes/admin');
var adoptante = require('./routes/adoptante');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(middlewareSession);
app.use(expressValidator());


app.use('/', invitados);
app.use('/', general);
app.use('/', protectoras);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;