const User = require('../models/User');
const passport = require('passport');

const express = require('express'),
  router = express.Router();

// Render the root page
router.get('/', (req, res) => {
  res.render('index');
});

// Show the sign up ( register ) page
router.get('/register', (req, res) => {
  res.render('users/signup');
});

// Save user sign up data in the data base and authentiate user
router.post('/register', (req, res) => {
  let newUser = new User({
    username: req.body.username,
    surname: req.body.surname,
    email: req.body.email,
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      req.flash('error', err.message);
      res.redirect('back');
      return;
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success', 'Welcome to Debbie, ' + user.username);
      res.redirect('/');
    });
  });
});

// Sign out route
router.get('/signout', (req, res) => {
  req.logout();
  req.flash('success', 'See you later!');
  res.redirect('/');
});

module.exports = router;
