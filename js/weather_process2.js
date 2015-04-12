/**
* Copyright (c) <2013-> <yunnysunny@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
* @lisence MIT
* @author gaoyang  <yunnysunny@gmail.com>
* @date 2012.3.18
*/
var BASE_URL_BAIDU = 'http://api.map.baidu.com/telematics/v3/weather';
var BAIDU_AK = '52c2843c2d061b4a40934d09d90bc51d';
function getWeather(city) {
	var params = 'ak=' + BAIDU_AK + '&location=' + city + '&output=json';
	SJS.sendRequest('get',BASE_URL_BAIDU,params,function(data) {
		
		if (data.error == 0)
		{
			var obj = data.results[0];
			var weatherInfo = obj.weather_data;
			var todayWeather = weatherInfo[0];
			SJS.$('dateNow').innerHTML = todayWeather.date;
			SJS.$('weathDescription').innerHTML = todayWeather.weather;
			SJS.$('city').innerHTML = obj.currentCity;
			SJS.$('weatherImg1').setAttribute('src',todayWeather.dayPictureUrl);
			SJS.$('weatherImg2').setAttribute('src',todayWeather.nightPictureUrl);
			SJS.$('temp').innerHTML = todayWeather.temperature;
			SJS.$('wind').innerHTML = todayWeather.wind;

			var days = SJS.getElementsByClassName(SJS.$('otherDates'),'div','sub2');
			for (var i=0,len=days.length;i<len ;i++ )
			{
				var dayNow = days[i];
				var info = weatherInfo[i+1];
				var imgs = dayNow.getElementsByTagName('img');
				imgs[0].setAttribute('src',info.dayPictureUrl);
				imgs[1].setAttribute('src',info.nightPictureUrl);
				SJS.getElementsByClassName(dayNow,'span','temp')[0].innerHTML = info.temperature;
				SJS.getElementsByClassName(dayNow,'span','description')[0].innerHTML = info.weather;
				SJS.getElementsByClassName(dayNow,'span','wind')[0].innerHTML = info.wind;		
			}				
			
			SJS.show(SJS.$('container'));
			stopAnimation();
			getPM2_5(obj.pm25);
		}
		else
		{
			alert(data.status);
		}
	},'jsonp');
	
}

function getPM2_5(pm25Value) {
	var quality = '';
	var qualiteArea = SJS.$('quality');
	if (!isNaN(pm25Value)) {
		if (pm25Value <= 50) {
			qualiteArea.className = 'you';
			quality = '优'
		} else if (pm25Value <= 100 ) {
			qualiteArea.className = 'liang';
			quality = '良';
		} else if (pm25Value <= 150 ) {
			qualiteArea.className = 'zhong';
			quality = '中';
		} else {
			qualiteArea.className = 'cha';
			quality = '差';
		}	
		SJS.$('pm25').innerHTML = pm25Value;
	} else {
		quality = '获取失败';
		qualiteArea.className = 'cha';
	}
	qualiteArea.innerHTML = quality;
	SJS.show(qualiteArea,'inline');
	
}

getWeather(remote_ip_info.city);

	