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
//读取数据库banner的数据，渲染达到广告页面
db.find('banner',{},(data)=>{
  res.render('banner/banner',{
    username:username,
    bannerArr:data
  }); 
})

 });
  //新增广告内容
  router.get('/addBanner', function(req, res, next) {
    // 从缓存中获取登录信息
    let username = req.session.userInfo.username;
    // console.log(username);
    res.render('banner/addBanner.html',{
      username
    });
  });
  //新增广告添加的处理路由
  router.post('/addBanner', function(req, res, next) { 
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
         let bannerPath=files.bannerImg[0].path //旧的路径
         let newpath='./upload/'+files.bannerImg[0].originalFilename//新的路径名
         fs.rename(bannerPath,newpath,(err)=>{
           if(err){
             console.log(err);
             
           }
           console.log("图片上传成功");
           
         })
         //把图片写入数据库

         let bannerId=fields.bannerId[0];
         let bannerImg=files.bannerImg[0].originalFilename;
         let bannerInfo=fields.bannerInfo[0];
         db.insert('banner',{bannerId,bannerImg,bannerInfo},(data)=>{
          //  console.log(data.result);
          if(data.result.n==1){
            console.log("图片上传成功")
            res.redirect('/banner');
          }
         }) 
        })
     });



     //修改
     router.get('/updateBanner',function(req,res,next){
      // 从缓存中获取登录信息
      let username = req.session.userInfo.username;
      // 获取传递过来的bannerId值
      let bannerId = req.query.bannerId;
      // console.log(bannerId);
      // 从数据中查找对应的数据
      db.find('banner',{bannerId},(data)=>{
        // console.log(data);
        res.render('banner/updateBanner.html',{
          username,
          bannerArr:data
        });
      })
    });
    
    /* 修改广告执行路由 */
    router.post('/updateBanner',function(req,res,next){
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
        if (err) {
          console.log(err);
        };
    
        // 上传图片到服务器
        let oldPath = files.bannerImg[0].path   // oldPath = 'upload\\EgrWeG1k1zfsdQU-Amw1ljfu.jpg'
        let newPath = './upload/'+ files.bannerImg[0].originalFilename  // newPath = 'upload/1.jpg'
       
        fs.rename(oldPath,newPath,(err)=>{
          if (err) {
            console.log(err);
          };
          // console.log('-------------图片上传成功！--------------');
        })
  
        // 做判断，是否更新图片的判断
        let bannerFilename = files.bannerImg[0].originalFilename;
          
    
        if (bannerFilename) {   // 上传新的图片 --- 更新了图片
          // 删除老的图片
          let oldBanner_Img = fields.banner_Img[0];    // oldBanner_Img = '3.jpg'
          fs.unlink('./upload/'+oldBanner_Img,(err)=>{
            if (err) {
              console.log(err);
            };
          })
          var bannerImg = files.bannerImg[0].originalFilename;
        } else {  // 没有上传新的图片 --- 没有更新图片
          let oldBannerPath = files.bannerImg[0].path;
          fs.unlink(oldBannerPath,(err)=>{
            if (err){
              console.log(err);
            };         
          })
          var bannerImg = fields.banner_Img[0];
        }
    
        // 把图片信息写入数据库
    
        // 获取更新的条件
        // "_id" : ObjectId("5e85982ee815942d282177c2")
        // "_id" : "5e85982ee815942d282177c2"
        // mongodb数据的唯一"_id"需要转换格式  new db.ObjectID(fields.banner_Id[0]);
        let banner_Id =  new db.ObjectID(fields.banner_Id[0]);
        // console.log(`-------------${banner_Id}--------------`);
    
        // 需要更新的数据
        let bannerId = fields.bannerId[0];
        // let bannerImg = files.bannerImg[0].originalFilename;
        let bannerInfo = fields.bannerInfo[0];
    
        db.update('banner',{"_id":banner_Id},{bannerId,bannerImg,bannerInfo},(data)=>{
          // console.log(data.result);
          if (data.result.n == 1 ) {
            // console.log('-------------修改广告成功！--------------');
            res.redirect('/banner');
          }      
        })
    
      })  
    
    });


          /* 删除广告 */
          router.get('/deleteBanner',function(req,res,next){
            // 获取传递过来的bannerId值
            let bannerId = req.query.bannerId;
            // 获取传递过来的bannerImg值
            let bannerImg = req.query.bannerImg;
            fs.unlink('./upload/'+bannerImg,(err)=>{
              if (!err) {
                console.log('----------删除广告图片成功-----------');
              }
            })
            // 从数据中查找对应的数据
            db.delete('banner',{bannerId},(data)=>{
              // console.log(data.result);
              if (data.result.n == 1) {
                // console.log(`-----------删除广告图片成功----------`);
                res.redirect('/banner');
              }
            })
          });



 module.exports = router;
