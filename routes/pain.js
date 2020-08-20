const Pain = require('../models/Pain'),
  express = require('express'),
  router = express.Router();

// Get the pain input page
router.get('/pain', (req, res) => {
  if (!res.locals.currentUser) {
    req.flash('error', 'Please sign up or sign in first!');
    return res.redirect('/register');
  }
  let id = res.locals.currentUser._id;
  Pain.findOne({ userId: id }, (err, data) => {
    if (err) {
      req.flash('error', 'Something went wrong.');
      return res.redirect('back');
    }
    res.render('pain/input', { painSubmit: data.painSubmit });
  });
});

// Post the pain level to the server
router.post('/pain', (req, res) => {
  if (!res.locals.currentUser) {
    req.flash('error', 'Please sign up or sign in first!');
    return res.redirect('/register');
  }
  let data = parseInt(req.body.pain);
  let currentUser = res.locals.currentUser;
  Pain.findOne({ userId: currentUser._id })
    .then((pain) => {
      if (!pain) {
        let pain = new Pain({
          userId: currentUser._id,
          daily: [[data]],
          painSubmit: true,
        });
        pain.save((err) => {
          if (err) {
            req.flash('error', 'Something went wrong.');
            return res.redirect('back');
          }
          req.flash('success', 'Successfully recorded your pain.');
          return res.redirect('back');
        });
      } else {
        pain = painLevels(data, pain, 'daily', 7);
        pain.painSubmit = true;
        Pain.update({ userId: currentUser._id }, pain, (err) => {
          if (err) {
            req.flash('error', 'Something went wrong.');
            return res.redirect('back');
          }
          req.flash('success', 'Successfully recorded your pain.');
          return res.redirect('back');
        });
      }
    })
    .catch((err) => console.log(err));
});

// API routes for getting pain data
router.get('/api/pain/:userId/:timeframe?', (req, res) => {
  let userId = req.params.userId;
  let timeframe = req.params.timeframe;
  Pain.findOne({ userId }, (err, data) => {
    if (err) {
      return res.json({ error: err.message });
    } else {
      if (timeframe) {
        if (
          timeframe === 'daily' ||
          timeframe === 'weekly' ||
          timeframe === 'monthly'
        ) {
          let obj = {};
          obj[timeframe] = data[timeframe];
          return res.json(obj);
        } else {
          return res.json({
            error: `${timeframe} is not a valid timeframe. You can use daily, weekly and montly instead.`,
          });
        }
      } else {
        return res.json(data);
      }
    }
  });
});

const painLevels = (painNum, pain, timeframe, length) => {
  let time = pain[timeframe];
  if (time.length === 0) {
    pain[timeframe].push([painNum]);
    return pain;
  } else {
    let index = time.length - 1;
    if (time[index].length < length) {
      time[index].push(painNum);
      pain[timeframe] = [...time];
      return pain;
    } else if (time[index].length === length) {
      let painTotal = time[index].reduce((tot, e) => tot + e);
      pain[timeframe].push([painNum]);
      return timeframe === 'daily'
        ? painLevels(parseInt(painTotal / length), pain, 'weekly', 4)
        : timeframe === 'weekly'
        ? painLevels(parseInt(painTotal / length), pain, 'monthly', 12)
        : pain;
    }
  }
};

module.exports = router;
