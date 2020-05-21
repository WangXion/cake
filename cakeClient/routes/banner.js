var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {  
  // res.send('respond with a resource');
  res.send({
    code:200,
    msg:'respond with a resource'
  });
  console.log("--------------------");
  console.log(req);
  console.log("--------------------");
  console.log(res);
});

module.exports = router;
