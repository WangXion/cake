var express = require('express');
var router = express.Router();
var db=require('../modules/db')

/* GET home page. */

router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  db.find('Mania',{},(data)=>{
      res.send(data)
  })

});


module.exports = router;
