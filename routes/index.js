const User = require('../models/User');
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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
      res.redirect('/report');
    });
  });
});

// Show the update account page
router.get('/update', (req, res) => {
  if (!res.locals.currentUser) {
    req.flash('error', 'Please sign into your account before updating it.');
    res.redirect('/login');
  } else {
    res.render('users/update', { user: res.locals.currentUser });
  }
});

// Save user updated data in the data base and authentiate user
router.put('/update', (req, res) => {
  User.find()
    .where('email')
    .equals(req.body.email)
    .exec((err, foundUser) => {
      if (foundUser._id && foundUser._id !== res.locals.currentUser._id) {
        req.flash('error', 'User name already taken!');
        return res.redirect('back');
      } else if (err) {
        req.flash('error', 'Something went wrong.');
      } else {
        User.findById({ _id: res.locals.currentUser._id }, (err, user) => {
          if (err) {
            req.flash('error', err.message);
            res.redirect('back');
          } else {
            user.username = req.body.username;
            user.surname = req.body.surname;
            user.email = req.body.email;
            user.password = req.body.password;
            user.save((err) => {
              if (err) {
                req.flash('error', err.message);
                res.redirect('back');
              } else {
                req.flash(
                  'success',
                  'Successfully updated your account details.'
                );
                req.logIn(user, (err) => {
                  if (err) {
                    req.flash('error', err.message);
                    return res.redirect('back');
                  } else return res.redirect('/report');
                });
              }
            });
          }
        });
      }
    });
});

// Sign in get route
router.get('/login', (req, res) => {
  res.render('auth/login', { page: 'login' });
});

// Sign in post route
router.post(
  '/login',
  passport.authenticate('local', {
    successFlash: `Welcome Back!`,
    failureFlash: true,
    successRedirect: '/report',
    failureRedirect: '/login',
  }),
  (req, res) => {}
);

// Sign out route
router.get('/signout', (req, res) => {
  req.logout();
  req.flash('success', 'See you later!');
  res.redirect('/');
});

// Forget password get route
router.get('/forget', (req, res) => {
  res.render('auth/forget');
});

router.post('/forget', async (req, res) => {
  let token = crypto.randomBytes(20);
  await User.findOne({ email: req.body.email }, (err, data) => {
    if (!data) {
      req.flash('error', 'There is no account with this email.');
      return res.redirect('/forget');
    } else if (err) {
      req.flash('error', err.message);
      return res.redirect('/forget');
    }
    data.resetPasswordToken = token.toString('hex');
    data.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    data.save((err) => {
      if (err) {
        req.flash('error', 'Something went wrong.');
        return res.redirect('back');
      }
      sendMail(
        req,
        res,
        data,
        `You are recieving this because you (or someone else) have requested the reset of the password. Please click on the following link, or paste this into your browser to complete the process.
      http://${req.headers.host}/reset/${data.resetPasswordToken}
      If you did not request this, please ignore this email and your password will remian unchange.
       This link only last for only an hour.`,
        'Reset mail has sent to you. Please Check it to reset your password.',
        '/login'
      );
    });
  });
});

router.get('/reset/:token', (req, res) => {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      if (!user || err) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forget');
      }
      res.render('auth/reset', { token: req.params.token });
    }
  );
});

router.post('/reset/:token', (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token }, (err, user) => {
    if (err || !user) {
      req.flash('error', 'Password reset token is invalid or expired.');
      return res.redirect('/forget');
    }
    user.setPassword(req.body.password, (err) => {
      if (err) {
        req.flash('error', 'Something went wrong!');
        return res.redirect('login');
      }
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.save((err) => {
        if (err) {
          req.flash('error', 'Something went wrong!');
          return res.redirect('login');
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash('error', 'Something went wrong!');
            return res.redirect('login');
          }
        });
        sendMail(
          req,
          res,
          user,
          `Hello ${user.username}!
            This is a confirmation that the password for your account ${user.email} has just been changed.`,
          'Success! Your password has been changed.',
          '/'
        );
      });
    });
  });
});

const sendMail = (req, res, user, mailText, success, redirect) => {
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.TWOFACT,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Debbie Reset Password',
    text: mailText,
  };

  smtpTransport.sendMail(mailOptions, (error) => {
    if (error) {
      req.flash('error', error.message);
      return res.redirect('back');
    }
  });
  req.flash('success', success);
  res.redirect(redirect);
};

module.exports = router;
