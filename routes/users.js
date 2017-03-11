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
router.get('/signup',function(req,res,next){
  var notice = req.cookies.notice;
  res.render('users/register', {
    notice: notice
  });
});

// POST register
router.post('/signup',function(req,res,next){
  var email = req.param('email');
  var password = req.param('password');
  var passwordAgain = req.param('passwordAgain');
  var firstname = req.param('firstname');
  var lastname = req.param('lastname');

  console.log(email);
  console.log(password);
  console.log(passwordAgain);

  // check if password match
  if (password != passwordAgain){
    console.log('Password do not match');
    res.cookie('notice', 'Passwords do not match');

    return res.redirect('/users/signup')
  }

  res.status(200).json({email: email,
    password: password,
    firstname: firstname,
    lastname: lastname
  });
});

module.exports = router;
