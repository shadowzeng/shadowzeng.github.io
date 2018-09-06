var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('public/index.html');
});

router.get('/test', function(req, res, next){
  res.send('OK!');
});

router.get('/jsonptest', function(req, res, next){
  var testData = {name:"test"};
  var content = JSON.stringify(testData);

  if (req.query && req.query.callback){
    content = req.query.callback+'('+JSON.stringify(testData)+')';
  }
  res.send(content);
});

module.exports = router;
