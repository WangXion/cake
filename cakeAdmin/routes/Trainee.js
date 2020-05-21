 var express = require('express');
 var router = express.Router();
 //引入MongoDB封装模块
 var db=require('../modules/db.js');
 //引入图片上传模块
 var multiparty=require('multiparty');
 //引入fs模块
 var fs=require('fs');

 /* GET home page. */
 router.get('/', function(req, res, next) {
   //从缓存最终获取登录信息 
let username=req.session.userInfo.username;
// console.log(username);
//读取数据库Trainee的数据，渲染达到广告页面
db.find('Trainee',{},(data)=>{
  res.render('Trainee/Trainee',{
    username:username,
    TraineeArr:data
  }); 
})

 });
  // 新增广告内容
  router.get('/addTrainee', function(req, res, next) {
    // 从缓存中获取登录信息
    let username = req.session.userInfo.username;
    // console.log(username);
    res.render('Trainee/addTrainee',{
      username
    });
  });
  //新增广告添加的处理路由
  router.post('/addTrainee', function(req, res, next) { 
        //获取表单提交的数据及post传过来的图片
        let from=new multiparty.Form();
        console.log(from);
        //上传图片保存的地址  目录必须存在 需要在app.JS里面设置静态资源
        from.uploadDir='Trainee';
        from.parse(req,(err,fields,files)=>{
          // err:错误信息
          // fields：表单发送的name的值
          // files：上传的图片信息
          if(err) {
            console.log(err);
            
          };//简便方法 有错就报错
         //重命名
         //把图片写入数据库

         let TraineeId=fields.TraineeId[0];
         let username=fields.username[0];
         let password=fields.password[0];

         db.insert('Trainee',{TraineeId,username,password},(data)=>{
          //  console.log(data.result);
          if(data.result.n==1){
            console.log("增加管理员成功")
            res.redirect('/Trainee');
          }
         }) 
        })
     });



    //修改
     router.get('/updateTrainee',function(req,res,next){
        //从缓存最终获取登录信息 
       let username=req.session.userInfo.username;  
          //获取传递过来的bannerId
       let TraineeId=req.query.TraineeId;
       
       let Trainee_id=new db.ObjectID(req.query.Trainee_id)
     console.log(TraineeArr[i]._id)
     db.find('Trainee',Trainee_Id,(data)=>{
      //  console.log(data);
       res.render('Trainee/updateTrainee',{
        username,
        Trainee_id,
        TraineeArr:data
       })
    
                    
     })
     })



//       //修改管理员执行路由
 /* 修改管理员执行路由 */
router.post('/updateTrainee',function(req,res,next){
console.log("---------出来----------------")

console.log(req.body)
// TraineeId: '5',
// username: 'wx',
// password: '1111'

    // let Trainee_Id=req.body._id;
    // console.log(Trainee_Id)
    // let TraineeId=req.body.TraineeId;
    // console.log(TraineeId)
    // let username=req.body.username;
    // let password=req.body.password;
    // db.update('Trainee',{Trainee_Id,TraineeId,username,password},(data)=>{
    //   // console.log(data.result);
    //   if (data.result.n == 1 ) {
    //     console.log('-------------修改管理员成功！--------------');
    //     res.redirect('/Trainee');
    //   }      
    // })
});



//           /* 删除管理员 */
          router.get('/deleteTrainee',function(req,res,next){
            // 获取传递过来的TraineeId值
            let TraineeId = req.query.TraineeId;
            // 获取传递过来的TraineeImg值
            let username = req.query.username;
            fs.unlink('./Trainee/'+username,(err)=>{
              if (!err) {
                console.log('----------删除管理员-----------');
              }
            })
            // 从数据中查找对应的数据
            db.delete('Trainee',{TraineeId},(data)=>{
              // console.log(data.result);
              if (data.result.n == 1) {
                // console.log(`-----------删除管理员----------`);
                res.redirect('/Trainee');
              }
            })
          });



 module.exports = router;
