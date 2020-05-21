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

    //定义一个数组并在里面写入相对应的键值对
    let shopCont = {
        name: $(".Cro .title").html(), //名字
        price: $(".Cro .price").html().split('.')[0].replace(/[^0-9]/ig, ""),//价格
        img: $(".contentImg p:eq(0) img").attr('src'), //图片
        count: 1, //数量默认
    };
    console.log(shopCont)
    //如果数据重复 走此逻辑   当前数组内的数量+1 并且价格也相对应数量
    if (JSON.parse(localStorage.getItem("contArr")) !== null) { //如果数据不为空
        contArr = JSON.parse(localStorage.getItem("contArr")); //获取数据
        for (let i = 0; i < contArr.length; i++) { //循环数组
            if (shopCont.name == contArr[i].name) { //如果数据重复 走此逻辑  判断获取到的名字跟数组内哪条数组i的名字相等
                contArr[i].count++; //那么当前i的数量+1
                contArr[i].price = '¥' + (contArr[i].count * parseInt(shopCont.price.replace(/[^0-9]/ig, "")));
                //设置当前i的总价格  数量*单价
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
//蛋糕
$.ajax({
    type: "get",
    url: "http://localhost:5000/Mania",
    dataType: "json",
    success: function (response) {
        // console.log(response);
        var res=response
        //得到json里面的数据
       
        let  lunbohtml='';
        let  showhtml='';
        let  Crohtml='';
        let  Labelhtml='';
        
        for (let i in res) {
            let  ManiaId=res[i].ManiaId;
            if(inid1==ManiaId){
                let   lunbo=res[i].lunbo;
                let   Maniapricr=res[i].Maniapricr;
                let   Maniaweight=res[i].Maniaweight;
                let   ManiaDescription=res[i].ManiaDescription;
                let   ManiaEnglish=res[i].ManiaEnglish;
                let   show=res[i].show;
                let   Label=res[i].Label;
                // console.log(Label)
                for (let i = 0; i < Label.length; i++) {
                    Labelhtml +=`
                    <a href="">${Label[i].label}&nbsp;></a>
                    `   
                  }
          for (let i = 0; i < lunbo.length; i++) {
            lunbohtml +=`
            <div class="swiper-slide">
            <img src="http://localhost:3000/${lunbo[i].img}" class="lunb1"/>
        </div> 
            `   
          }
          for (let i = 0; i < show.length; i++) { 
            showhtml +=`
            <p><img src="http://localhost:3000/${show[i].img}" alt=""></p>
            `
            

          }
            Crohtml +=`
            <h3>${ManiaEnglish}</h3>
			<p class="title">${ManiaDescription}</p>
			<p class="price">${Maniapricr}</p>
			<p class="site">限区域上海（A30绕城以内），北京（五环以内）满39元包邮，杭州绕城以内39元包邮</p>
			
          
          `
        }
     
    }
    $(".swiper-wrapper").html(lunbohtml);
    $(".Cro").html(Crohtml);
    $(".contentImg").html(showhtml);
    $(".classify").html(Labelhtml);

}
});








