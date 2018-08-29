var express = require('express');
var router = express.Router();
var mongoUtils = require('../dao/mongodb');

mongoUtils.connect();

router.post('/save', function(req, res, next){
    if (req && req.body){
        console.log(req.body);
        mongoUtils.save(req.body);
    }
});

router.get('/getAll', function(req, res, next){
    mongoUtils.findAll(function(data){
        res.send(data);
    });
});

router.get('/get', function(req, res, next){

});

router.get('/insert', function(req, res, next){
    mongoUtils.save({test:'zeng',test2:'2018-08-29 10:58:00',num:10});
    mongoUtils.close();
});

router.get('/closedb', function(req, res, next){
    mongoUtils.close();
});

module.exports = router;