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
//读取数据库scholarship的数据，渲染达到广告页面
db.find('scholarship',{},(data)=>{
  res.render('scholarship/scholarship',{
    username:username,
    scholarshipArr:data
  }); 
})

 });
  // 新增广告内容
  router.get('/addScholarship', function(req, res, next) {
    // 从缓存中获取登录信息
    let username = req.session.userInfo.username;
    // console.log(username);
    res.render('scholarship/addScholarship',{
      username
    });
  });
  //新增广告添加的处理路由
  router.post('/addScholarship', function(req, res, next) { 
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
         let scholarshipPath1=files.scholarshipImg1[0].path //旧的路径
         let scholarshipPath2=files.scholarshipImg2[0].path //旧的路径
         let scholarshipPath3=files.scholarshipImg3[0].path //旧的路径
         let scholarshipPath4=files.scholarshipDescriptionImg[0].path //旧的路径
         let newpath1='./upload/'+files.scholarshipImg1[0].originalFilename//新的路径名
         let newpath2='./upload/'+files.scholarshipImg2[0].originalFilename//新的路径名
         let newpath3='./upload/'+files.scholarshipImg3[0].originalFilename//新的路径名
         let newpath4='./upload/'+files.scholarshipDescriptionImg[0].originalFilename//新的路径名
         fs.rename(scholarshipPath1,newpath1,(err)=>{
           if(err){
             console.log(err);
             
           }
           console.log("图片上传成功");
           
         })
         fs.rename(scholarshipPath2,newpath2,(err)=>{
          if(err){
            console.log(err);
            
          }
          console.log("图片上传成功");
          
        })
        fs.rename(scholarshipPath4,newpath3,(err)=>{
          if(err){
            console.log(err);
            
          }
          console.log("图片上传成功");
          
        })
        fs.rename(scholarshipPath3,newpath4,(err)=>{
          if(err){
            console.log(err);
            
          }
          console.log("图片上传成功");
          
        })
         //把图片写入数据库

         let scholarshipId=fields.scholarshipId[0];
         let scholarshipImg1=files.scholarshipImg1[0].originalFilename;
         console.log("-----------------------");
         console.log(scholarshipImg1)
         let scholarshipImg2=files.scholarshipImg2[0].originalFilename;
         console.log("-----------------------");
         console.log(scholarshipImg2)
         let scholarshipImg3=files.scholarshipImg3[0].originalFilename;
         console.log("-----------------------");
         console.log(scholarshipImg3)
         let scholarshippricr=fields.scholarshippricr[0];
         let scholarshipweight=fields.scholarshipweight[0];
         let scholarshipDescription=fields.scholarshipDescription[0];
         let scholarshipEnglish=fields.scholarshipEnglish[0];
         let scholarshipdescription=fields.scholarshipdescription[0];
         let scholarshipDescriptionImg=files.scholarshipDescriptionImg[0].originalFilename;
         console.log("-----------------------");
         console.log(scholarshipDescriptionImg)
         db.insert('scholarship',{scholarshipId,scholarshipImg1,scholarshipImg2,scholarshipImg3,scholarshippricr,scholarshipweight,scholarshipDescription,scholarshipEnglish,scholarshipdescription,scholarshipDescriptionImg},(data)=>{
          //  console.log(data.result);
          if(data.result.n==1){
            console.log("图片上传成功")
            res.redirect('/scholarship');
          }
         }) 
        })
     });



    //修改
     router.get('/updateScholarship',function(req,res,next){
        //从缓存最终获取登录信息 
       let username=req.session.userInfo.username;  
          //获取传递过来的bannerId
       let scholarshipId=req.query.scholarshipId;
    //  console.log(bannerId)
     db.find('scholarship',{scholarshipId},(data)=>{
      //  console.log(data);
       res.render('scholarship/updatescholarship',{
        username,
        scholarshipArr:data
       })
    
                    
     })
     })



//       //修改广告执行路由
 /* 修改广告执行路由 */
router.post('/updateScholarship',function(req,res,next){
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
    let oldPathImg1 = files.scholarshipImg1[0].path  
    let oldPathImg2 = files.scholarshipImg2[0].path  
    let oldPathImg3 = files.scholarshipImg3[0].path  
    let newPath1 = './upload/'+ files.scholarshipImg1[0].originalFilename 
    let newPath2 = './upload/'+ files.scholarshipImg2[0].originalFilename 
    let newPath3 = './upload/'+ files.scholarshipImg3[0].originalFilename 
   
    fs.rename(oldPathImg1,newPath1,(err)=>{
      if (err) {
        console.log(err);   
      };
      // console.log('-------------图片上传成功！--------------');
    })
    fs.rename(oldPathImg2,newPath2,(err)=>{
      if (err) {
        console.log(err);   
      };
      // console.log('-------------图片上传成功！--------------');
    })
    fs.rename(oldPathImg3,newPath3,(err)=>{
      if (err) {
        console.log(err);   
      };
      // console.log('-------------图片上传成功！--------------');
    })
    // 做判断，是否更新图片的判断
    let scholarshipFilename = files.scholarshipImg1[0].originalFilename;
      

    if (scholarshipFilename) {   // 上传新的图片 --- 更新了图片
      // 删除老的图片
      let oldscholarship_Img = fields.scholarship_Img1[0];    // oldscholarship_Img = '3.jpg'
      fs.unlink('./upload/'+oldscholarship_Img,(err)=>{
        if (err){
          console.log(err);
        };
      })
      var scholarshipImg = files.scholarshipImg1[0].originalFilename;
    } else {  // 没有上传新的图片 --- 没有更新图片
      let oldscholarshipPath = files.scholarshipImg1[0].path;
      fs.unlink(oldscholarshipPath,(err)=>{
        if (err){
          console.log(err);
        };         
      })
      var scholarshipImg = fields.scholarship_Img1[0];
    }

    // 把图片信息写入数据库

    // 获取更新的条件
    // "_id" : ObjectId("5e85982ee815942d282177c2")
    // "_id" : "5e85982ee815942d282177c2"
    // mongodb数据的唯一"_id"需要转换格式  new db.ObjectID(fields.scholarship_Id[0]);
    let scholarship_Id =  new db.ObjectID(fields.scholarship_Id[0]);
    // 需要更新的数据
    let scholarshipImg1=files.scholarshipImg1[0].originalFilename;
    console.log("-----------------------");
    console.log(scholarshipImg1)
    let scholarshipImg2=files.scholarshipImg2[0].originalFilename;
    console.log("-----------------------");
    console.log(scholarshipImg2)
    let scholarshipImg3=files.scholarshipImg3[0].originalFilename;
    console.log("-----------------------");
    console.log(scholarshipImg3)
    let scholarshippricr=fields.scholarshippricr[0];
    let scholarshipweight=fields.scholarshipweight[0];
    let scholarshipDescription=fields.scholarshipDescription[0];
    let scholarshipEnglish=fields.scholarshipEnglish[0];
    console.log(scholarshipDescription)
    console.log("---------------------------")
    console.log(scholarshipEnglish)
    let scholarshipdescription=fields.scholarshipdescription[0];
    let scholarshipDescriptionImg=files.scholarshipDescriptionImg[0].originalFilename;
    console.log("-----------------------");
    console.log(scholarshipDescriptionImg)
    db.update('scholarship',{"_id":scholarship_Id},{scholarshipImg1,scholarshipImg2,scholarshipImg3,scholarshippricr,scholarshipweight,scholarshipDescription,scholarshipEnglish,scholarshipdescription,scholarshipDescriptionImg},(data)=>{
      // console.log(data.result);
      if (data.result.n == 1 ) {
        // console.log('-------------修改广告成功！--------------');
        res.redirect('/scholarship');
      }      
    })

  })  

});



          /* 删除广告 */
          router.get('/deleteScholarship',function(req,res,next){
            // 获取传递过来的scholarshipId值
            let scholarshipId = req.query.scholarshipId;
            // 获取传递过来的scholarshipImg值
            let scholarshipImg = req.query.scholarshipImg;
            fs.unlink('./upload/'+scholarshipImg,(err)=>{
              if (!err) {
                console.log('----------删除广告图片成功-----------');
              }
            })
            // 从数据中查找对应的数据
            db.delete('scholarship',{scholarshipId},(data)=>{
              // console.log(data.result);
              if (data.result.n == 1) {
                // console.log(`-----------删除广告图片成功----------`);
                res.redirect('/scholarship');
              }
            })
          });



 module.exports = router;
