cartNumJuage(); //直接判断购物车数量的逻辑  在是引入的cartNumJuage.js里面的一个函数

var contArr = []; //定义一个空数组
var newArr = JSON.parse(localStorage.getItem("contArr")) //获取本地的contArr 并命名为newArr
if (newArr !== null) { //判断localStorage中是否存在contArr数组 若存在则将存在的加入新定义的空contArr
    for (let i = 0; i < newArr.length; i++) {
        contArr.push(newArr[i])
    }
}
$('.go').click(function (e) { //购物车按钮点击事件
    // console.log($('.fa'))
    e.preventDefault();
    //购物车模态的显示与隐藏
    $('.modalCase').show();
    setTimeout(function () {
        $('.modalCase').hide();
    }, 800)
    console.log($('.contentTwo').find(' .contentTwo_binaju img').attr('src'));
    //定义一个数组并在里面写入相对应的键值对
    let shopCont = {
        name: $(this).parents('.contentTwo').find('.contentTwo_binaju  .contentTwo_div h4 span:nth-child(1)').html(), //名字
        price: $(this).parents(".contentTwo").find('.contentTwo_binaju  .contentTwo_div h4 span:nth-child(2)').text().split('.')[0], //价格
        img: $(this).parents('.contentTwo').find(' .contentTwo_binaju img').attr('src'), //图片
        count: 1, //数量默认
    };
    //如果数据重复 走此逻辑   当前数组内的数量+1 并且价格也相对应数量
    if (JSON.parse(localStorage.getItem("contArr")) !== null) { //如果数据不为空
        contArr = JSON.parse(localStorage.getItem("contArr")); //获取数据
        for (let i = 0; i < contArr.length; i++) { //循环数组
            if (shopCont.name == contArr[i].name) { //如果数据重复 走此逻辑  判断获取到的名字跟数组内哪条数组i的名字相等
                contArr[i].count++; //那么当前i的数量+1
                contArr[i].price = '¥' + (contArr[i].count * parseInt(shopCont.price.replace(/[^0-9]/ig, ""))); //设置当前i的总价格  数量*单价
                localStorage.setItem("contArr", JSON.stringify(contArr)); //将修改后的contArr重新存进本地的localStorage
                cartNumJuage(); //运行购物车数量逻辑
                return; //若走了此逻辑 到这里直接返回 不走之后的逻辑
            }
        }
    }

    //如果数据不重复
    contArr.push(shopCont); //直接push
    localStorage.setItem("contArr", JSON.stringify(contArr)); //将修改后的contArr重新存进本地的localStorage
    cartNumJuage(); //运行购物车数量逻辑
});

$.ajax({
    type: "get",
    url: "http://localhost:5000/banner",
    dataType: "json",
    success: function (response) {
        // console.log(response);
        //得到json里面的数据
       var res=response;
        // console.log(typeof res)
 
        //遍历对象
        var  bannerhtml='';
        var bannerImg=[];
        for (let i in res) {
            // var id = res[i].bannerId;
            bannerImg.push(res[i].bannerImg) 
        //     //拿到页面传过来的的id跟json的比较

        }
          //轮播
          for (let j = 0; j < bannerImg.length; j++) {
            //es6拼接
            // console.log(bannerImg.length)
            bannerhtml +=
             `<div class="swiper-slide">
            <img src="http://localhost:3000/${bannerImg[j]}">
            </div>`;
        }
        // console.log(bannerImg)
        $("#swiper").html(bannerhtml);
        // console.log(bannerhtml)
    }
});
//主页内容
$.ajax({
    type: "get",
    url: "http://localhost:5000/commodityk",
    dataType: "json",
    success: function (response) {
        // console.log(response);
        //得到json里面的数据
       var res=response;
        // console.log(typeof res)
 
        // //遍历对象
        var  newhtml='';
        var  popularhtml='';
        var  birthdayhtml='';
        var commoditykImg=[];
        for (let i in res) {
            var commoditykid = res[i].commoditykId;
            var dataItem = res[i].dataItem;
            var commoditykImg = res[i].commoditykImg;
            var commoditykpricr = res[i].commoditykpricr;
            var commoditykweight = res[i].commoditykweight;
            var commoditykcount = res[i].commoditykcount;
            var commoditykDescription = res[i].commoditykDescription;
            var commoditykEnglish = res[i].commoditykEnglish;
            // console.log(commoditykid)
            // console.log(dataItem)
            // console.log(commoditykImg)
            // console.log(commoditykpricr)
            // console.log(commoditykweight)
            // console.log(commoditykcount)
            // console.log(commoditykDescription)
            // console.log(commoditykEnglish)
            //新品
   if(dataItem=="new"){
     newhtml +=`
            <div class="contentTwo">
				<div class="contentTwo_binaju" data-index="${commoditykid}">
					<img src="http://localhost:3000/${commoditykImg}" alt=""  class="box_Img">
					<div class="contentTwo_div">
						<div>
						<h4><span class="name">${commoditykDescription}</span> <span class="price">${commoditykpricr}</span> <span>${commoditykweight}</span></h4>
						<div><span>${commoditykEnglish}</span></div>
						</div>
						<p><i class="fa fa-shopping-cart go" aria-hidden="true"></i></p>
					</div>
				</div>
			</div>
            `
        }
//人气
        if(dataItem=="popular"){
            popularhtml +=`
                   <div class="contentTwo">
                       <div class="contentTwo_binaju" data-index="${commoditykid}">
                           <img src="http://localhost:3000/${commoditykImg}" alt="" class="box_Img">
                           <div class="contentTwo_div">
                               <div>
                               <h4><span class="name">${commoditykDescription}</span> <span class="price">${commoditykpricr}</span> <span>${commoditykweight}</span></h4>
                               <div><span>${commoditykEnglish}</span></div>
                               </div>
                               <p><i class="fa fa-shopping-cart go" aria-hidden="true"></i></p>
                           </div>
                       </div>
                   </div>
                   `
               }
               //生日

               if(dataItem=="birthday"){
                birthdayhtml +=`
                       <div class="contentTwo">
                           <div class="contentTwo_binaju" data-index="${commoditykid}">
                               <img src="http://localhost:3000/${commoditykImg}" alt="" class="box_Img">
                               <div class="contentTwo_div">
                                   <div>
                                   <h4><span class="name">${commoditykDescription}</span> <span class="price">${commoditykpricr}</span> <span>${commoditykweight}</span></h4>
                                   <div><span>${commoditykEnglish}</span></div>
                                   </div>
                                   <p><i class="fa fa-shopping-cart go" aria-hidden="true"></i></p>
                               </div>
                           </div>
                       </div>
                       `
                   }
    }
        $("#new").html(newhtml);
        $("#popular").html(popularhtml);
        $("#birthday").html(birthdayhtml);


        // console.log(newhtml)
    }
});

//进入详情页

$("#sq").on("click",".contentTwo_binaju",function(e){
    window.location.href="index_xiangqing1.html?id="+$(this).attr('data-index');  
})
