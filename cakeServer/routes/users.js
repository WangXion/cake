var express = require('express');
var router = express.Router();

// 引入操作mongodb数据库模块
var db = require('../modules/db');

/* GET users listing. */
router.get('/', function(req, res, next) {

  db.find('banner',{},(data)=>{
    res.send(data);
  })

});

module.exports = router;


/* 


app.all('/test', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



*/