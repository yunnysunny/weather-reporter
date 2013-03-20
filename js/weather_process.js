function getWeather(cityObj) {
	if (typeof cityObj == 'object')
	{
		var cityId = cityObj['i'][0]['i'];
		SJS.sendRequest('post','get-weather-data.php','cityId='+cityId,function(data) {
			
			if (data.indexOf('error,') == -1)
			{
				var obj = eval('('+data+')');
				var weatherInfo = obj.weatherinfo;

				SJS.$('dateNow').innerHTML = weatherInfo.date_y + '(' + weatherInfo.week + ')';
				SJS.$('weathDescription').innerHTML = weatherInfo.img_title1;
				SJS.$('city').innerHTML = weatherInfo.city;
				SJS.$('weatherImg').setAttribute('src','http://m.weather.com.cn/img/b'+weatherInfo.img1+'.gif');
				SJS.$('temp').innerHTML = weatherInfo.temp1;
				SJS.$('wind').innerHTML = weatherInfo.wind1;
				SJS.show(SJS.$('container'));
			}
			else
			{
				alert(data.substr(6));
			}
		});
	}
}
document.write('<script language="javascript" src="http://toy.weather.com.cn/SearchBox/searchBox?callback=getWeather&language=zh&keyword='+remote_ip_info.city+'"><\/script>');	