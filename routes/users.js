var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/get/sehyunjin-api', function(req, res){
	res.status(200).json({
    	"message" : "hello get api popoop"
        });
 });

 router.post('/api/post/sehyunjin-api',function(req, res){
	res.status(200).json({
    	"message" : "hello post api nodejs-api"
    });    
});    
module.exports = router;
