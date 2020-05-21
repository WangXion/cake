<?php
$server = "localhost";
$db_username = "root";
$db_password = "";
$db = "users";

// 1.连接MySQL服务器
$con = mysqli_connect($server,$db_username,$db_password);

if(!$con){
	// 如果连接失败输出错误
	die("can't connect".mysqli_error());
}
// 2.选择数据库(user是数据库名称)
mysqli_select_db($con,$db);
// 字符转换，读库
// mysqli_query("set charseter set 'utf-8'");
// 写库
// mysqli_query("set names 'utf-8'");


// 3.执行SQL语句


// 4.释放结果集


// 5.关闭MySQL服务器





?>