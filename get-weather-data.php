<?php
define('PM2_5_BASE_URL', 'http://www.pm25.in/api/querys/pm2_5.json');
/**
* 关于这个token值可以去http://www.pm25.in/api_doc上进行申请
*/
define('PM2_5_TOKEN', '5j1znBVAsnSf5xQyNQyq');

function getRemoteData($url) {
	// 初始化一个 cURL 对象
	$curl = curl_init();

	// 设置你需要抓取的URL
	curl_setopt($curl, CURLOPT_URL, $url);

	// 设置header
	#curl_setopt($curl, CURLOPT_HEADER, 1);

	// 设置cURL 参数，要求结果保存到字符串中还是输出到屏幕上。
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

	// 运行cURL，请求网页
	$data = curl_exec($curl);

	#print $data;
	#print_r(curl_getinfo($curl));
	// 关闭URL请求
	curl_close($curl);

	return $data;
}
header('Content-type: text/html; charset=UTF-8');
$action = $_POST['action'];
if ($action == 'showWeather') {
	$id = $_POST['cityId'];
	if (is_numeric($id)) {
		$data = getRemoteData('http://m.weather.com.cn/data/'.$id.'.html');
		echo  $data;
	} else {
		echo 'error,非法的id参数';
	}
} else if ($action == 'showPM2_5') {

	$city = $_POST['city'];
	$data = getRemoteData(PM2_5_BASE_URL.'?token='.PM2_5_TOKEN.'&city='.$city.'&stations=no');
	if (!$data) {
		echo 'error,获取pm2.5数据失败';
		return;
	}
	$json = json_decode($data);
	if (!$json) {
		echo 'error,解析pm2.5数据失败';
		return;
	}
	if (isset($json->error)) {
		echo 'error,'.$json->error;
		return;
	}
	echo $data;
	
} else {
	echo 'error,请求参数错误';
}

