var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
//引入session保存用户信息

var seession=require('express-session')

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var RegisterRouter = require('./routes/register');
var loginOutRouter = require('./routes/loginOut');
var bannerRouter = require('./routes/banner');
var commoditykRouter = require('./routes/commodityk');
var scholarshipRouter = require('./routes/scholarship');
var ManiaRouter = require('./routes/Mania');
var CreamRouter = require('./routes/Cream');
var CoffeeRouter = require('./routes/Coffee');
var BreadRouter = require('./routes/Bread');
var NormalRouter = require('./routes/Normal');
var DesignRouter = require('./routes/Design');
var TraineeRouter = require('./routes/Trainee');
var orderRouter = require('./routes/order');



var app = express();
//保存用户信息
app.use(seession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
     maxAge: 1000*60*30*24 
    },
    rolling:true
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 设置视图引擎后缀，为.html
app.engine('.html', ejs.__express);
// 设置视图引擎为html
app.set('view engine', 'html'); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//静态资源目录
app.use(express.static(path.join(__dirname, 'public')));
//静态资源目录
app.use(express.static(path.join(__dirname, 'upload')));
app.use(express.static(path.join(__dirname, 'Trainee')));
//自定义中间件 判断登录状态  路由守卫
app.use((req,res,next)=>{
  if (req.url=='/login' || req.url=='/register') {
    next()
  }else{
    if (req.session.userInfo && req.session.userInfo.username !='') {
      //配置全局变量，可以在任何模块中使用
      req.app.locals['userInfo']=req.session.userInfo
       next();
    }else{
       res.redirect('/login');
    }
  }
})
//路由
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', RegisterRouter);
app.use('/loginOut', loginOutRouter);
app.use('/banner', bannerRouter);
app.use('/commodityk', commoditykRouter);
app.use('/scholarship', scholarshipRouter);
app.use('/Mania', ManiaRouter);
app.use('/Cream', CreamRouter);
app.use('/Coffee', CoffeeRouter);
app.use('/Bread', BreadRouter);
app.use('/Normal', NormalRouter);
app.use('/Design', DesignRouter);
app.use('/Trainee', TraineeRouter);
app.use('/order', orderRouter);


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
