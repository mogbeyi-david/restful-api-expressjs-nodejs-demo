var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var index = require('./routes/index');
var users = require('./routes/users');
var company = require('./routes/company');
var _config = require('./config/config');
var jwt          = require('jsonwebtoken');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator([]));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/v1/company/*',function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var isAdmin = function() {
        return (_config.admin_secret_key == token);
    };

    if(isAdmin()){
        next();
        return;
    }
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, _config.secret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                if(req.method != 'GET'){
                    console.log(req.method);
                    return res.json({"error":"sorry you are not authorized to perform this operation"});
                }
                next();
            }
        });
    } else {
        return res.json({"error":"sorry please you don't have access"});
    }
});


app.use('/', index);
app.use('/v1/users', users);
app.use('/v1/company',company);

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
