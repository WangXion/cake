var express = require('express');
var router = express.Router();
var db=require('../modules/db.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
//销毁用户信息
req.session.destroy((err)=>{
    if (err) {
        console.log(err);
        
    }else{
        res.redirect('/login')
    }
})

});
   

module.exports = router;
