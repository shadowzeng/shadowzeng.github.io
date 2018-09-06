var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // 设置views文件夹为存放视图（模板文件）的目录
app.set('view engine', 'jade');   // 设置视图模板引擎为jade

app.use(logger('dev'));   // 加载日志中间件
app.use(express.json());   // 
app.use(express.urlencoded({ extended: false }));  // 加载解析urlencode请求体的中间件
app.use(cookieParser());   // 加载解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public')));  // 设置public为存放静态文件的目录

// router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);

// 允许/blog跨域请求
app.all('/blog', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if (req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});

// 捕获404错误并转发到错误处理器
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
