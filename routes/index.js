var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
var db; var hashed;
var bcrypt = require('bcrypt');

MongoClient.connect('mongodb://abir:123456@ds127968.mlab.com:27968/exartdb', function (err, database) {
  if (err) return console.log(err)
  else {
    db = database;
    console.log("Database connected!");
  }
  //
  // db.collection('mammals').find().toArray(function (err, result) {
  //   if (err) throw err
  //
  //   console.log(result)
  // })
})


/* GET home page. */
router.get('/', function(req, res) {

  res.render('index', { title: 'Express'  });
});

/* GET sign page */
router.get('/sign', function(req, res) {
  res.render('./pages/sign', {title: 'Sign', success: req.session.success, errors:req.session.errors});

  req.session.errors = null;
  req.session.success = null;
});

/* POST form data */
router.post('/sign/up', function(req, res, next) {

  //Validation
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Invalid Password!').isLength({min: 4}).equals(req.body.conf_password);

  var errors = req.validationErrors();

  if (errors){
    req.session.errors = errors;
    req.session.success = false;
    console.log("Errors!");
    res.redirect('/sign');

  } else {
    req.session.errors = false;
    req.session.success = true;

    console.log("Success!");

    var password = req.body.password;
    if(typeof password!== 'udnefined'){
      // Inserting into database by 'bcrypting' password
      bcrypt.hash(password, 10, function(err, hash) {
         db.collection('users').save({
           title: 'Sign',
           fname: req.body.first_name,
           lname: req.body.last_name,
           email: req.body.email,
           password: hash
         });
      });
    }else {
      console.log("Password is undefined!");
    }
    // bcrypt.compare(req.body.password, hashed, function(err, res) {
    //
    // });
  }




  next()
}, function(req, res, next) {
  res.render('./pages/sign', {
    title: 'Sign',
    successfulEntry: 1,
    fname: req.body.first_name,
    lname: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  });
  next()
}

)


/* GET all static pages(in footer). */
router.get('/:staticpage', function(req, res) {
  res.render('staticpage', {title: req.params.staticpage})
});
module.exports = router;
