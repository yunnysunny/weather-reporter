var log4js = require('log4js');
var slogger = require('node-slogger');

var configObj = require('../config.json');
var settings = require('./lib/settings').init(configObj);
exports.port = settings.loadNecessaryInt('port');

//保证配置文件中的errorFile属性存在，且其所在目录在当前硬盘中存在
var errorFile = settings.loadNecessaryFile('errorFile', true);
var traceLogger,errorLogger;

log4js.configure({
    appenders: [
        {type: 'console',category:'console'},
        {type: 'file', filename: errorFile, maxLogSize: 1024000, backups: 10, category: 'error'}
    ],
    replaceConsole: true
});
traceLogger = exports.tracelogger = log4js.getLogger('console');
errorLogger = exports.errorlogger = log4js.getLogger('error');

slogger.init({
    errorLogger:errorLogger,
    disableCustomConsole :true
});

exports.xinzhiUid = settings.loadNecessaryString('uid');
exports.xinzhiKey = settings.loadNecessaryString('key');


