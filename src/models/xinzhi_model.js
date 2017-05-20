var crypto = require('crypto');
var config = require('../config');
const UID = config.xinzhiUid;
const KEY = config.xinzhiKey;
const TTL = 2592000;


exports.genSign = function() {console.log(KEY,'key',UID,'uid');
    var ts = Math.floor(new Date().getTime() / 1000);
    var str = 'ts=' + ts + '&ttl=' + TTL + '&uid=' + UID;
    var sign = crypto.createHmac('sha1',KEY).update(str).digest('base64');
    return {ts:ts,sign:sign};
};