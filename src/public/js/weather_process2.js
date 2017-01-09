/**
* Copyright (c) <2013-> <yunnysunny@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
* @lisence MIT
* @author gaoyang  <yunnysunny@gmail.com>
* @date 2017.1.9
*/
var BASE_URL_API = 'https://api.thinkpage.cn/v3/weather/daily.json';
var UID = 'UE6651266E';
var TTL = 600;
var BASE_URL_IMG = 'https://www.thinkpage.cn';
var MAP_WEATHER_IMG = { "晴": "/weather/images/icons/3d_50/3.png", "多云": "/weather/images/icons/3d_50/4.png", "晴间多云": "/weather/images/icons/3d_50/6.png", "大部多云": "/weather/images/icons/3d_50/8.png", "阴": "/weather/images/icons/3d_50/9.png", "阵雨": "/weather/images/icons/3d_50/10.png", "雷阵雨": "/weather/images/icons/3d_50/11.png", "雷阵雨伴有冰雹": "/weather/images/icons/3d_50/12.png", "小雨": "/weather/images/icons/3d_50/13.png", "中雨": "/weather/images/icons/3d_50/14.png", "大雨": "/weather/images/icons/3d_50/15.png", "暴雨": "/weather/images/icons/3d_50/16.png", "大暴雨": "/weather/images/icons/3d_50/17.png", "特大暴雨": "/weather/images/icons/3d_50/18.png", "冻雨": "/weather/images/icons/3d_50/19.png", "雨夹雪": "/weather/images/icons/3d_50/20.png", "阵雪": "/weather/images/icons/3d_50/21.png", "小雪": "/weather/images/icons/3d_50/22.png", "中雪": "/weather/images/icons/3d_50/23.png", "大雪": "/weather/images/icons/3d_50/24.png", "暴雪": "/weather/images/icons/3d_50/25.png", "浮尘": "/weather/images/icons/3d_50/26.png", "扬沙": "/weather/images/icons/3d_50/27.png", "沙尘暴": "/weather/images/icons/3d_50/28.png", "强沙尘暴": "/weather/images/icons/3d_50/29.png", "雾": "/weather/images/icons/3d_50/30.png", "霾": "/weather/images/icons/3d_50/31.png", "风": "/weather/images/icons/3d_50/32.png", "大风": "/weather/images/icons/3d_50/33.png", "飓风": "/weather/images/icons/3d_50/34.png", "热带风暴": "/weather/images/icons/3d_50/35.png", "龙卷风": "/weather/images/icons/3d_50/36.png", "冷": "/weather/images/icons/3d_50/37.png", "热": "/weather/images/icons/3d_50/38.png", "未知": "/weather/images/icons/3d_50/99.png" };

function __Img(text) {
    return BASE_URL_IMG + MAP_WEATHER_IMG[text];
}

function getWeather(city) {
    var signData = SJS.$('sign-data');
    var params = 'ts=' + signData.getAttribute('ts') + '&ttl=' + TTL + '&uid=' + UID + '&sign=' + signData.getAttribute('sign') + '&location=' + encodeURIComponent(city) + '&days=4';
    //var params = 'key=dkpjjetqan4gyllr&location=' + encodeURIComponent(city) + '&days=4';
    SJS.sendRequest('get', BASE_URL_API, params, function(data) {

        var obj = data.results[0];
        var weatherInfo = obj.daily;
        var todayWeather = weatherInfo[0];
        SJS.$('dateNow').innerHTML = todayWeather.date;
        SJS.$('weathDescription').innerHTML = todayWeather.text_day + '-' + todayWeather.text_night;
        SJS.$('city').innerHTML = city;
        SJS.$('weatherImg1').setAttribute('src', __Img(todayWeather.text_day));
        SJS.$('weatherImg2').setAttribute('src', __Img(todayWeather.text_night));
        SJS.$('temp').innerHTML = todayWeather.low + '到' + todayWeather.high;
        SJS.$('wind').innerHTML = todayWeather.wind_scale;

        var days = SJS.getElementsByClassName(SJS.$('otherDates'), 'div', 'sub2');
        for (var i = 1, len = days.length; i < len; i++) {
            var dayNow = days[i];
            var info = weatherInfo[i];
            var imgs = dayNow.getElementsByTagName('img');
            imgs[0].setAttribute('src', __Img(info.text_day));
            imgs[1].setAttribute('src', __Img(info.text_night));
            SJS.getElementsByClassName(dayNow, 'span', 'temp')[0].innerHTML = info.low + '到' + info.high;;
            SJS.getElementsByClassName(dayNow, 'span', 'description')[0].innerHTML = info.text_day + '-' + info.text_night;
            SJS.getElementsByClassName(dayNow, 'span', 'wind')[0].innerHTML = info.wind_scale;
        }

        SJS.show(SJS.$('container'));
        stopAnimation();
        //getPM2_5(obj.pm25);

    }, 'jsonp');

}

function getPM2_5(pm25Value) {
    var quality = '';
    var qualiteArea = SJS.$('quality');
    if (!isNaN(pm25Value)) {
        if (pm25Value <= 50) {
            qualiteArea.className = 'you';
            quality = '优'
        } else if (pm25Value <= 100) {
            qualiteArea.className = 'liang';
            quality = '良';
        } else if (pm25Value <= 150) {
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
    SJS.show(qualiteArea, 'inline');

}

getWeather(returnCitySN.cname);