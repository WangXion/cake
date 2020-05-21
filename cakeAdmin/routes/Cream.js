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
//读取数据库Cream的数据，渲染达到广告页面
db.find('Cream',{},(data)=>{
  res.render('Cream/Cream',{
    username:username,
    CreamArr:data
  }); 
})

 });
  // 新增广告内容
  router.get('/addCream', function(req, res, next) {
    // 从缓存中获取登录信息
    let username = req.session.userInfo.username;
    // console.log(username);
    res.render('Cream/addCream',{
      username
    });
  });
  //新增广告添加的处理路由
  router.post('/addCream', function(req, res, next) { 
        //获取表单提交的数据及post传过来的图片
        let from=new multiparty.Form();
        // console.log(from);
        //上传图片保存的地址  目录必须存在 需要在app.JS里面设置静态资源
        from.uploadDir='upload';
        from.parse(req,(err,fields,files)=>{
          // err:错误信息
          // fields：表单发送的name的值
          // files：上传的图片信息
          if(err) {
            console.log(err);
            
          };//简便方法 有错就报错
         //重命名
         let CreamPath=files.CreamImg[0].path //旧的路径
         let newpath='./upload/'+files.CreamImg[0].originalFilename//新的路径名
         fs.rename(CreamPath,newpath,(err)=>{
           if(err){
             console.log(err);
             
           }
           console.log("图片上传成功");
           
         })
         //把图片写入数据库

         let CreamId=fields.CreamId[0];
         let CreamImg=files.CreamImg[0].originalFilename;
         let Creampricr=fields.Creampricr[0];
         let Creamweight=fields.Creamweight[0];
         let CreamDescription=fields.CreamDescription[0];
         let CreamEnglish=fields.CreamEnglish[0];
         db.insert('Cream',{CreamId,CreamImg,Creampricr,Creamweight,CreamDescription,CreamEnglish},(data)=>{
          //  console.log(data.result);
          if(data.result.n==1){
            console.log("图片上传成功")
            res.redirect('/Cream');
          }
         }) 
        })
     });



    //修改
     router.get('/updateCream',function(req,res,next){
        //从缓存最终获取登录信息 
       let username=req.session.userInfo.username;  
          //获取传递过来的bannerId
       let CreamId=req.query.CreamId;
    //  console.log(bannerId)
     db.find('Cream',{CreamId},(data)=>{
      //  console.log(data);
       res.render('Cream/updateCream',{
        username,
        CreamArr:data
       })
    
                    
     })
     })



//       //修改广告执行路由
 /* 修改广告执行路由 */
router.post('/updateCream',function(req,res,next){
  // 获取表单的数据，以及post传过来的图片
  let form = new multiparty.Form();
  // console.log(form); // form对象

  // 上传图片保存的地址，目录必须存在，需要在app.js中设置目录为静态资源目录
  form.uploadDir = 'upload';

  //设置单文件大小限制
  //form.maxFilesSize = 2 * 1024 * 1024;
  //form.maxFields = 1000;  设置所以文件的大小总和

  form.parse(req,(err,fields,files)=>{
    /* 
      err:错误信息
      fields：表单发送的name的值
      files：上传图片的信息    
    */
    if (err){
      console.log(err);
    };

    // 上传图片到服务器
    let oldPath = files.CreamImg[0].path   // oldPath = 'upload\\EgrWeG1k1zfsdQU-Amw1ljfu.jpg'
    let newPath = './upload/'+ files.CreamImg[0].originalFilename  // newPath = 'upload/1.jpg'
   
    fs.rename(oldPath,newPath,(err)=>{
      if (err) {
        console.log(err);   
      };
      // console.log('-------------图片上传成功！--------------');
    })
    // 做判断，是否更新图片的判断
    let CreamFilename = files.CreamImg[0].originalFilename;
      

    if (CreamFilename) {   // 上传新的图片 --- 更新了图片
      // 删除老的图片
      let oldCream_Img = fields.Cream_Img[0];    // oldCream_Img = '3.jpg'
      fs.unlink('./upload/'+oldCream_Img,(err)=>{
        if (err){
          console.log(err);
        };
      })
      var CreamImg = files.CreamImg[0].originalFilename;
    } else {  // 没有上传新的图片 --- 没有更新图片
      let oldCreamPath = files.CreamImg[0].path;
      fs.unlink(oldCreamPath,(err)=>{
        if (err){
          console.log(err);
        };         
      })
      var CreamImg = fields.Cream_Img[0];
    }

    // 把图片信息写入数据库

    // 获取更新的条件
    // "_id" : ObjectId("5e85982ee815942d282177c2")
    // "_id" : "5e85982ee815942d282177c2"
    // mongodb数据的唯一"_id"需要转换格式  new db.ObjectID(fields.Cream_Id[0]);
    let Cream_Id =  new db.ObjectID(fields.Cream_Id[0]);
    // 需要更新的数据
    
    let CreamImgtwo=files.CreamImg[0].originalFilename;
    let Creampricr=fields.Creampricr[0];
    let Creamweight=fields.Creamweight[0];
    let CreamDescription=fields.CreamDescription[0];
    let CreamId = fields.CreamId[0];
    let CreamEnglish=fields.CreamEnglish[0];
    db.update('Cream',{"_id":Cream_Id},{CreamId,CreamImgtwo,Creampricr,Creamweight,CreamDescription,CreamEnglish},(data)=>{
      // console.log(data.result);
      if (data.result.n == 1 ) {
        // console.log('-------------修改广告成功！--------------');
        res.redirect('/Cream');
      }      
    })

  })  

});



//           /* 删除广告 */
          router.get('/deleteCream',function(req,res,next){
            // 获取传递过来的CreamId值
            let CreamId = req.query.CreamId;
            // 获取传递过来的CreamImg值
            let CreamImg = req.query.CreamImg;
            fs.unlink('./upload/'+CreamImg,(err)=>{
              if (!err) {
                console.log('----------删除广告图片成功-----------');
              }
            })
            // 从数据中查找对应的数据
            db.delete('Cream',{CreamId},(data)=>{
              // console.log(data.result);
              if (data.result.n == 1) {
                // console.log(`-----------删除广告图片成功----------`);
                res.redirect('/Cream');
              }
            })
          });



 module.exports = router;
