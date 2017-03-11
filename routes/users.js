var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET logins
router.get('/login',function(req,res,next){
  res.render('users/login');
});

// POST logins
router.post('/login',function(req,res,next){});

// GET register
router.get('/signup',function(req,res,next){});

// POST register
router.post('/signup',function(req,res,next){});

module.exports = router;
