var express = require('express');
var router = express.Router();
var defaultView="../app/views/";

// router.get('/admin', function(req, res, next) {
//   res.render(defaultView+'filenotfound');
// });

/* GET home page. */
router.get('/admin', function(req, res, next) {
    res.redirect('/');
}); 
router.get('/bin/www', function(req, res, next) {
    res.redirect('/admin/login');
});
// router.get('/', function(req, res, next) {
//     res.redirect('/admin/home');
// });
router.get('/', function(req, res, next) {
    res.render(defaultView+'web_index');
});
router.get('/admin/login', function(req, res, next) {
  res.render(defaultView+'login');
});
router.get('/admin/forgotPassword', function(req, res, next) {
  res.render(defaultView+'forgot-password');
});
router.get('/admin/signup', function(req, res, next) {
  res.render(defaultView+'register');
});
router.get('/admin/home', function(req, res, next) {
  res.render(defaultView+'index');
});

////////////////////////   header and footer  ///////////////
// router.get('/admin/headerFrame', function(req, res, next) {
//   res.render(defaultView+'header');
// });

// router.get('/admin/footerFrame', function(req, res, next) {
//   res.render(defaultView+'footer');
// });

//////////////////////////////////////////////////////////////////////
//homepages navigations.


module.exports = router;