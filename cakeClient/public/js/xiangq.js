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
        name: $(".Cro .title").html(), //名字
        price: $(".Cro .price").html().split('.')[0].replace(/[^0-9]/ig, ""), //价格
        img: $(".contentImg p:eq(0) img").attr('src'), //图片
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
$(".contentTwo .contentTwo_binaju").click(function (e) {
    e.preventDefault();
    console.log( $(this).attr('data-index'));
    window.location.href="index_xiangqing1.html?id="+$(this).attr('data-index');
});



//点击回退
$(".prev").click(function () {
    // console.log("aa");
    window.history.go(-1);
});


// console.log(window.location.search);
//拿到传过来的id
var id=window.location.search;
var inid=id.split(/\D/);
var inid1=inid[4];
console.log(inid1);

$.ajax({
    type: "get",
    url: "http://localhost:5000/scholarship",
    dataType: "json",
    success: function (response) {
        console.log(response);
        var res=response;
        var  lunbohtml='';
        var  zhuhtml='';
        var  jieshaohtml='';
   
    for(var i in res){
        var scholarshipId=res[i].scholarshipId;
       
        if(inid1==scholarshipId){
        var lunbo=res[i].lunbo;
        // console.log(scholarshipId)
        // console.log(inid1)
        var scholarshippricr=res[i].scholarshippricr;
        var show=res[i].show;
        // console.log(show)
        var scholarshipDescription=res[i].scholarshipDescription;
        var introduce=res[i].introduce;
        var scholarshipEnglish=res[i].scholarshipEnglish;
            //商品轮播
        for (let i = 0; i < lunbo.length; i++) {
            lunbohtml +=`
            <div class="swiper-slide">
             <img src="http://localhost:3000/${lunbo[i].img}" class=""/>
            </div>
              `
            
        }
        //商品介绍
        for (let j = 0; j < show.length; j++) {
            jieshaohtml +=`
             <p><img src="http://localhost:3000/${show[j].img}" alt=""></p>
            `
  
        }
        //商品内容
        zhuhtml +=`
        <h3>${scholarshipEnglish}</h3>
			<p class="title">${scholarshipDescription}</p>
			<p class="price">${scholarshippricr}</p>
			<p class="site">${introduce}</p>
			<p class="classify">
				<a href="">儿童&nbsp;></a>
				<a href="">女性&nbsp;></a>
				<a href="">面包&nbsp;></a>
			</p>

        `
       
        }
 
  }
  $(".swiper-wrapper").html(lunbohtml)
  $(".Cro").html(zhuhtml)
  $(".contentImg").html(jieshaohtml)
  console.log($(".contentImg"))
    }

});





