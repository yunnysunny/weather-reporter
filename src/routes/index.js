var express = require('express');
var router = express.Router();
var xinzhi = require('../controllers/xinzhi_controller');

/* 显示登陆. */
router.get('/', xinzhi.index);

module.exports = router;