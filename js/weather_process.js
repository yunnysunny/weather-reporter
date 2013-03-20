var IMG_BASE_URL = 'http://m.weather.com.cn/img/b';
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
				SJS.$('weathDescription').innerHTML = weatherInfo.weather1;
				SJS.$('city').innerHTML = weatherInfo.city;
				SJS.$('weatherImg1').setAttribute('src',IMG_BASE_URL+weatherInfo.img1+'.gif');
				SJS.$('weatherImg2').setAttribute('src',IMG_BASE_URL+weatherInfo.img2+'.gif');
				SJS.$('temp').innerHTML = weatherInfo.temp1;
				SJS.$('wind').innerHTML = weatherInfo.wind1;

				var days = SJS.getElementsByClassName(SJS.$('otherDates'),'div','sub2');
				for (var i=0,len=days.length;i<len ;i++ )
				{
					var dayNow = days[i];
					var imgs = dayNow.getElementsByTagName('img');
					imgs[0].setAttribute('src',IMG_BASE_URL + weatherInfo['img'+((i+2)*2-1)] + '.gif');
					imgs[1].setAttribute('src',IMG_BASE_URL + weatherInfo['img'+((i+2)*2)] + '.gif');
					SJS.getElementsByClassName(dayNow,'span','temp')[0].innerHTML = weatherInfo['temp'+(i+2)];
					SJS.getElementsByClassName(dayNow,'span','description')[0].innerHTML = weatherInfo['weather'+(i+2)];
					SJS.getElementsByClassName(dayNow,'span','wind')[0].innerHTML = weatherInfo['wind'+(i+2)];
				}				
				
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