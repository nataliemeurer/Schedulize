var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var db = require('./database/dbSchema');

var app = express();

// Declare routers
var authRouter = express.Router();
var apiRouter = express.Router();
var userRouter = express.Router();
var publicRouter = express.Router();
var adminRouter = express.Router();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// uncomment after placin=g your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../client')));
app.use(session({
  secret: 'schedulizetheapp',
  saveUninitialized: true,
  resave: false
}));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// Set Basic routing paths
app.use('/', publicRouter);
app.use('/user', userRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

// // Include Router files
require('./routes/apiRoutes.js')(apiRouter);
require('./routes/publicRoutes.js')(publicRouter);
require('./routes/authRoutes.js')(authRouter);
require('./routes/userRoutes.js')(userRouter);
require('./routes/adminRoutes.js')(adminRouter);


// app.use('/', routes);
// app.use('/auth', auth);
// app.use('/api', api);
// app.use('/admin', admin);
// app.use('/user', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ERROR HANDLERS

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
