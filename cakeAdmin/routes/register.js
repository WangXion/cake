var express = require('express');
var router = express.Router();
var db=require('../modules/db.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
 res.render('register.html')
});
//注册
router.post('/', function(req, res, next) {
//    console.log(req.body);
   let json=req.body;
//    console.log(json)
   if (json.username=='' && json.password=='') {
       res.send('<script>alert("账号和密码不能为空，请重新输入")</script>')    
   }else{
    db.find('Trainee',{},(data)=>{
        console.log(data)
     let  zhi=data.find((item)=>{  
            return json.username==item.username    
        })
        if (zhi) {
            res.redirect('/register')//插入失败
          }else{
              db.insert('Trainee',{
                  'username':req.body.username,
                  'password':req.body.password
                
              },(data)=>{
              })
              res.redirect('/login')
          }
     }) 
   
   }  
   });
module.exports = router;
