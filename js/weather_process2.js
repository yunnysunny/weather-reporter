/**
* Copyright (c) <2013-> <yunnysunny@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
* @lisence MIT
* @author gaoyang  <yunnysunny@gmail.com>
* @date 2012.3.18
*/
var BASE_URL_BAIDU = window.location.protocol + '//api.caiyunapp.com/v2/TAkhjf8d1nlSlspN/';

function getWeather(city) {
	var dataGeography = cityData['北京'];
	if (!dataGeography) {
		console.warn('当前程序未查找到');
	}
	var url = BASE_URL_BAIDU + dataGeography.join(',') + '/forecast.jsonp';
	SJS.sendRequest('get',url,undefined,function(data) {
		
		if (data.status === 'ok')
		{
			var obj = data.result.daily;
			var temperature = obj.temperature;
			var weatherInfo = obj.skycon;
			var windInfo = obj.wind;

			var todayWeather = weatherInfo[0];
			SJS.$('dateNow').innerHTML = todayWeather.date;
			SJS.$('weathDescription').innerHTML = todayWeather.value;
			SJS.$('city').innerHTML = city;
			//SJS.$('weatherImg1').setAttribute('src',todayWeather.dayPictureUrl);
			//SJS.$('weatherImg2').setAttribute('src',todayWeather.nightPictureUrl);

			var todayTemperature = temperature[0];
			SJS.$('temp').innerHTML = todayTemperature.min + '-' + todayTemperature.max;
			var todayWind = windInfo[0];
			SJS.$('wind').innerHTML = todayWind.avg.speed;

			var days = SJS.getElementsByClassName(SJS.$('otherDates'),'div','sub2');
			for (var i=0,len=days.length;i<len ;i++ )
			{
				var dayNow = days[i];
				var index = i + 1;
				var temp = temperature[index];
				var wea = weatherInfo[index];
				var win = windInfo[index];
				var imgs = dayNow.getElementsByTagName('img');
				//imgs[0].setAttribute('src',info.dayPictureUrl);
				//imgs[1].setAttribute('src',info.nightPictureUrl);
				
				SJS.getElementsByClassName(dayNow,'span','temp')[0].innerHTML = temp.min + '-' + temp.max;;
				SJS.getElementsByClassName(dayNow,'span','description')[0].innerHTML = wea.value;
				SJS.getElementsByClassName(dayNow,'span','wind')[0].innerHTML = win.avg.speed;		
			}				
			
			SJS.show(SJS.$('container'));
			stopAnimation();
			getPM2_5(data.result.hourly.pm25[0].value);
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

getWeather(returnCitySN.cname);

	