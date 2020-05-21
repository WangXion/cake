var express = require('express');
var router = express.Router();
var db=require('../modules/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
let username=req.session.userInfo.username;
console.log(username);
res.render('admin/index',{
  username:username
}); 
});

module.exports = router;
