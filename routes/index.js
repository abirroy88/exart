var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET sign page */
router.get('/sign', function(req, res, next) {
  res.render('./pages/sign');
});
/* POST form data */
router.post('/sign/:id', function(req, res) {
  res.render('./pages/sign', {
    title: 'Sign',
    fname: req.body.first_name,
    lname: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  });
})


/* GET all static pages(in footer). */
router.get('/:staticpage', function(req, res) {
  res.render('staticpage', {title: req.params.staticpage})
});
module.exports = router;
