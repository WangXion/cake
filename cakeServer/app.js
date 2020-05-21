var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bannerRouter = require('./routes/banner');
var commoditykRouter = require('./routes/commodityk');
var scholarshipRouter = require('./routes/scholarship');
var ManiaRouter = require('./routes/Mania');



// 解决cors跨域问题
var cors=require('cors');

var app = express();

// 配置cors跨域
app.use(cors({
  origin:"*",  //指定接收的地址    *表示接受所有请求
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",  //指定接收的请求类型
  alloweHeaders:['Content-Type','Authorization']  //指定header
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/banner', bannerRouter);
app.use('/commodityk', commoditykRouter);
app.use('/scholarship', scholarshipRouter);
app.use('/Mania', ManiaRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
