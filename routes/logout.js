var express = require('express');
var router = express.Router();

/*Get logout page */
router.get('/', function(req, res, next) {
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;