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
	if($row){
		echo "用户名已注册，请重新注册，谢谢！ "."<a href='userzhuce.html'>重新注册</a>";
		header("Refresh:3;url=01.userzhuce.html");  // 重新跳转到注册页面
		exit();
	}else{
		// SQL语句
		$sql = "insert into login values ('$username','$password')";
		// 3.执行SQL语句
		$result = mysqli_query($con,$sql);

		// 4.释放结果集
		if(!$result){
		    mysqli_free_result($result);
			// 5.关闭MySQL服务器
			mysqli_close($con);			
		}else{
			// mysqli_free_result($result);			
			echo "用户名注册成功，谢谢！";
			
			header("Refresh:3;url=user.html");  // 重新跳转到登录页面
			
			exit();			
		}

	}

}else{
	
	echo "请填写账号和密码，谢谢！";
	
};

/* 

PHP中，”NULL” 和 “空” 是2个概念。
isset 主要用来判断变量是否被初始化过。
empty 可以将值为 “假”、”空”、”0″、”NULL”、”未初始化” 的变量都判断为TRUE。
is_null 仅把值为 “NULL” 的变量判断为TRUE。
var == null 把值为 “假”、”空”、”0″、”NULL” 的变量都判断为TRUE。
var === null 仅把值为 “NULL” 的变量判断为TRUE。

*/

?>