var crypto = require('crypto');
var request = require('request');
const slogger = require('node-slogger');
var config = require('../config');
const UID = config.xinzhiUid;
const KEY = config.xinzhiKey;
const AK = config.baiduAk;
const BAIDU_LOCATION_URL = 'https://api.map.baidu.com/location/ip?ak='+ AK;
const TTL = 2592000;


exports.genSign = function() {console.log(KEY,'key',UID,'uid');
    var ts = Math.floor(new Date().getTime() / 1000);
    var str = 'ts=' + ts + '&ttl=' + TTL + '&uid=' + UID;
    var sign = crypto.createHmac('sha1',KEY).update(str).digest('base64');
    return {ts:ts,sign:sign};
};
function parseResponse(url,description, error,response,body,callback) {
    if (error) {
        slogger.error('请求'+url+'失败',error);
        callback('请求'+description+'网络错误');
        return;
    }
    if (!response) {
        callback('请求'+description+'失败，未知错误');
        return;
    }
    if (response.statusCode != 200) {
        slogger.error(url, response.statusCode, body);
        callback('请求'+description+'失败['+response.statusCode+']');
        return;
    }
    callback(false,body);
}
exports.getLocation = function(ip,callback) {
    const url = BAIDU_LOCATION_URL + '&ip=' + ip;
    const option = {json:true,timeout:5000};
    request.get(url,option,function(error,response,body) {
        parseResponse(url,'获取位置', error,response,body,callback);
    });
};