var express = require('express');
var router = express.Router();
var db=require('../modules/db.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
 res.render('login')
});
router.post('/', function(req, res, next) {
   console.log(req.body);
   let json=req.body;

   db.find('Trainee',json,(data)=>{
    //    console.log(data);
       if(data.length>0){
           req.session.userInfo=data[0];
           res.redirect('/')
       }else{
           res.redirect('/register')
       }
       
   })

   
   });
module.exports = router;
