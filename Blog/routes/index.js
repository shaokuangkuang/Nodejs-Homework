var express = require('express');
var router = express.Router();
var data = require('../data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/list', function(req, res, next) {
  if(req.body.username == data['users'][0].username && req.body.pwd == data['users'][0].password) {
    res.render('list',{list: data['chapterList']});
  } else {
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end("用户名密码错误");
  }  
});

module.exports = router;
