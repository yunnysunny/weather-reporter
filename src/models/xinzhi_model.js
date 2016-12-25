var crypto = require('crypto');
var config = require('../config');
const UID = config.xinzhiUid;
const KEY = config.xinzhiKey;
const TTL = 10;


exports.genSign = function() {
    var ts = Math.floor(new Date().getTime() / 1000);
    var str = 'ts=' + ts + '&ttl=' + TTL + '&uid=' + UID;
    var sign = crypto.createHmac('sha1',KEY).update(str).digest('base64');
    return {ts:ts,sign:sign};
};