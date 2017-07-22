var xinzhiModel = require('../models/xinzhi_model');


exports.index = function(req, res) {
    var data = xinzhiModel.genSign();
    const ip = data.ip = req.ip;
    xinzhiModel.getLocation(ip,function(err,location) {console.log(location);
        data.location = location || {};
        res.render('index',data);
    });
    
};