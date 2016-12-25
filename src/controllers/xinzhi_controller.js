var xinzhiModel = require('../models/xinzhi_model');
exports.index = function(req, res) {
    var data = xinzhiModel.genSign();
    res.render('index',data);
};