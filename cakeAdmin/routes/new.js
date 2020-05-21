var express = require('express');
var router = express.Router();
// 引入mongodb封装模块
var db = require('../modules/db.js');
// 引入图片上传模块 即可以获取form表单的数据，也可以实现上传图片
var multiparty = require('multiparty');
// 引入fs模块
var fs = require('fs');


/* 广告首页 */
router.get('/', function(req, res, next) {
  // 第一天知识点
  // 从缓存中获取登录信息
  let username = req.session.userInfo.username;
  // console.log(username);

  // 第二天知识点  读取数据库banner的数据，渲染到广告首页
  db.find('new',{},(data)=>{
    res.render('new/new',{
      username,
      newArr:data
    });
  })

});


/* 新增广告添加页 */
router.get('/addnew', function(req, res, next) {
  // 从缓存中获取登录信息
  let username = req.session.userInfo.username;
  // console.log(username);
  res.render('new/addnew',{
    username
  });
});

// /* 新增广告添加页处理路由 */
// router.post('/addnew', function(req, res, next) {
//   // 获取表单的数据，以及post传过来的图片
//   let form = new multiparty.Form();
//   // console.log(form); // form对象

//   // 上传图片保存的地址，目录必须存在，需要在app.js中设置目录为静态资源目录
//   form.uploadDir = 'upload';

//   //设置单文件大小限制
//   //form.maxFilesSize = 2 * 1024 * 1024;
//   //form.maxFields = 1000;  设置所以文件的大小总和

//   form.parse(req,(err,fields,files)=>{
//     /* 
//       err:错误信息
//       fields：表单发送的name的值
//       files：上传图片的信息    
//     */
//     if (err) throw err;


//     // 上传图片到服务器
//     let newPath = files.newImg[0].path   // oldPath = 'upload\\EgrWeG1k1zfsdQU-Amw1ljfu.jpg'
//     let newnewPath = './upload/'+ files.newImg[0].originalFilename  // newPath = 'upload/1.jpg'
   
//     fs.rename(newPath,newnewPath,(err)=>{
//       if (err) throw err;
//       console.log('-------------图片上传成功！--------------');
//     })

//     // 把图片信息写入数据库

//     let newId = fields.newId[0];
//     let newImg = files.newImg[0].originalFilename;
//     let newInfo = fields.newInfo[0];

//     db.insert('new',{newId,newImg,newInfo},(data)=>{
//       // console.log(data.result);
//       if (data.result.n == 1 ) {
//         console.log('-------------增加广告成功！--------------');
//         res.redirect('/new');
//       }
      
//     })

//   })

  
// });


// /* 修改广告 */
// router.get('/updatenew',function(req,res,next){
//   // 从缓存中获取登录信息
//   let username = req.session.userInfo.username;
//   // 获取传递过来的bannerId值
//   let bannerId = req.query.newId;
//   // console.log(bannerId);
//   // 从数据中查找对应的数据
//   db.find('new',{newId},(data)=>{
//     // console.log(data);
//     res.render('new/updatenew.html',{
//       username,
//       newArr:data
//     });
//   })
// });

// /* 修改广告执行路由 */
// router.post('/updatenew',function(req,res,next){
//   // 获取表单的数据，以及post传过来的图片
//   let form = new multiparty.Form();
//   // console.log(form); // form对象

//   // 上传图片保存的地址，目录必须存在，需要在app.js中设置目录为静态资源目录
//   form.uploadDir = 'upload';

//   //设置单文件大小限制
//   //form.maxFilesSize = 2 * 1024 * 1024;
//   //form.maxFields = 1000;  设置所以文件的大小总和

//   form.parse(req,(err,fields,files)=>{
//     /* 
//       err:错误信息
//       fields：表单发送的name的值
//       files：上传图片的信息    
//     */
//     if (err) throw err;



//     // 上传图片到服务器
//     let oldPath = files.newImg[0].path   // oldPath = 'upload\\EgrWeG1k1zfsdQU-Amw1ljfu.jpg'
//     let newnewPath = './upload/'+ files.newImg[0].originalFilename  // newPath = 'upload/1.jpg'
   
//     fs.rename(oldPath,newnewPath,(err)=>{
//       if (err) throw err;
//       // console.log('-------------图片上传成功！--------------');
//     })

//     /* 
//       没有更改图片的数据
//       {
//         bannerId: [ '333333' ],
//         banner_Id: [ '5e859b4a7853e11150321320' ],
//         banner_Img: [ '3.jpg' ],
//         bannerInfo: [ 'img333333333' ]
//       }
//       ----------------分割线-------------------
//       {
//         bannerImg: [
//           {
//             fieldName: 'bannerImg',
//             originalFilename: '',
//             path: 'upload\\ktyagE5GY9VRxdu3pZnpurvy',
//             headers: [Object],
//             size: 0
//           }
//         ]
//       }
//       */

//       /* 
//       更改了图片的数据
//       fields ：
//       {
//         bannerId: [ '10' ],
//         banner_Id: [ '5e85982ee815942d282177c2' ],
//         banner_Img: [ '1.jpg' ],
//         bannerInfo: [ 'img10' ]
//       }
//       ----------------分割线-------------------
//       files : 
//       {
//         bannerImg: [
//           {
//             fieldName: 'bannerImg',
//             originalFilename: '33.jpg',
//             path: 'upload\\7PaWCsLV5UVvhn8vqR4UixWu.jpg',
//             headers: [Object],
//             size: 14595
//           }
//         ]
//       }    
//       */

//     // 做判断，是否更新图片的判断
//     let newFilename = files.newImg[0].originalFilename;
      

//     if (newFilename) {   // 上传新的图片 --- 更新了图片
//       // 删除老的图片
//       let oldBanner_Img = fields.new_Img[0];    // oldBanner_Img = '3.jpg'
//       fs.unlink('./upload/'+oldBanner_Img,(err)=>{
//         if (err) throw err;
//       })
//       var bannerImg = files.newImg[0].originalFilename;
//     } else {  // 没有上传新的图片 --- 没有更新图片
//       let oldBannerPath = files.bannerImg[0].path;
//       fs.unlink(oldBannerPath,(err)=>{
//         if (err) throw err;         
//       })
//       var bannerImg = fields.banner_Img[0];
//     }

//     // 把图片信息写入数据库

//     // 获取更新的条件
//     // "_id" : ObjectId("5e85982ee815942d282177c2")
//     // "_id" : "5e85982ee815942d282177c2"
//     // mongodb数据的唯一"_id"需要转换格式  new db.ObjectID(fields.banner_Id[0]);
//     let banner_Id =  new db.ObjectID(fields.banner_Id[0]);
//     // console.log(`-------------${banner_Id}--------------`);

//     // 需要更新的数据
//     let newId = fields.newId[0];
//     // let bannerImg = files.bannerImg[0].originalFilename;
//     let newrInfo = fields.newInfo[0];

//     db.update('banner',{"_id":new_Id},{newId,newImg,newInfo},(data)=>{
//       // console.log(data.result);
//       if (data.result.n == 1 ) {
//         // console.log('-------------修改广告成功！--------------');
//         res.redirect('/banner');
//       }      
//     })

//   })  

// });


// /* 删除广告 */

// router.get('/deletenew',function(req,res,next){
//   // 获取传递过来的bannerId值
//   let newId = req.query.newId;
//   // 获取传递过来的bannerImg值
//   let newImg = req.query.newImg;
//   fs.unlink('./upload/'+newImg,(err)=>{
//     if (!err) {
//       console.log('----------删除广告图片成功-----------');
//     }
//   })
//   // 从数据中查找对应的数据
//   db.delete('new',{newId},(data)=>{
//     // console.log(data.result);
//     if (data.result.n == 1) {
//       // console.log(`-----------删除广告图片成功----------`);
//       res.redirect('/new');
//     }
//   })
// });


module.exports = router;