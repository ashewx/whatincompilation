var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var appSecret = process.env.NODE_APP_SECRET;

/* GET users listing. */
router.get('/', function(req, res, next) {
  var User = mongoose.model('User', userSchema);
  User.find({}).exec(function(err, users){
    if (err) throw err;

    res.status(200).json({users: users});
  });
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
  var User = mongoose('User', userSchema);
  var email = req.param('email');
  var password = req.param('password');
  var passwordAgain = req.param('passwordAgain');
  var firstname = req.param('firstname');
  var lastname = req.param('lastname');
  var university = req.param('university');

  // check if password match
  if (password != passwordAgain){
    console.log('Password do not match');
    res.cookie('notice', 'Passwords do not match');

    return res.redirect('/users/signup')
  }

  // check if user exists
  User.findOne({
    email: email
  })
    .exec(function(err,user){
      if (err) throw err;

      if (user){
        console.log('User exists');
        res('notice', 'User exists', {
          maxAge: new Date(Date.now() + 10),
        });
        return res.redirect('/users/signup');
      } else {
        // encrypt the password
        var encryptedPassword = crypto.createHmac('sha256', appSecret).update(password).digest('hex');

        // create new user
        var user = new User({
          email: email,
          password: encryptedPassword
        });
        user.save(function(err){
          if (err) throw err;
          res.cookie('notice', 'Successfully registered', {
            maxAge: new Date(Date.now() + 10),
          });

          return res.redirect('/users/login');
        });
      }
    });

  res.status(200).json({email: email,
    password: password,
    firstname: firstname,
    lastname: lastname
  });
});

module.exports = router;
