<?php
// 响应头
header("Content-Type:text/html;charset=utf8");

// 判断前端是否是通过sunmit按钮提交的数据，如果不是，属于非法操作
//if(!isset($_POST['submit'])){
//	die("您想干什么？非法操作");
//}

// 引入另外一个php -- require()引入的文件发生错误后面的php不会再执行  include() 引入的文件发生错误后面的php会再执行 
// 引入公共php，连接MySQL数据库
include('connect.php');

// 获取前端发送过来的数据
$username = $_POST['username'];  // 获取用户名表单值
$password = $_POST['password'];  // 获取用户密码表单值
//var_dump($username);
//var_dump($password);
// 账号密码不能为空
if( $username && $password ){
	// 先判断数据库中是否有当前注册的信息，如果有，返回已注册，否则就可以注册
	// 先把数据库中的数据拿出来，查询所有数据
	// SQL语句
	$sql = "select * from login where username = '$username'";
	// 3.执行SQL语句
	$result = mysqli_query($con,$sql);
	// 取出结果数据
	$row = mysqli_fetch_row($result);
		
	// var_dump($row);
	
	// die();
	
	if($row[0] == $username ){
		if($row[1] == $password){			
			echo "登录成功！";
            header("Refresh:0;url=index.html");  // 重新跳转到主页面
			exit();			
		}else{
			echo "用户名密码错误！";
			header("Refresh:1;url=user.html");  // 重新跳转到登录页面
		}
	}else{		
		echo "用户名不存在,请先去注册！";		
		header("Refresh:2;url=userzhuce.html");  // 重新跳转到注册页面
	}
	// 4.释放结果集
	mysqli_free_result($result);
	// 5.关闭MySQL服务器
	mysqli_close($con);	

}else{  // 账号密码为空
	echo "账号密码不能为空";
    header("Refresh:2;url=user.html");
}


?>