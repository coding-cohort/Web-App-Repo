const Pain = require('../models/Pain'),
  express = require('express'),
  router = express.Router();

// Get the pain input page
router.get('/pain', (req, res) => {
  if (!res.locals.currentUser) {
    req.flash('error', 'Please sign up or sign in first!');
    return res.redirect('/login');
  }
  let id = res.locals.currentUser._id;
  Pain.findOne({ userId: id }, (err, data) => {
    if (err) {
      req.flash('error', 'Something went wrong.');
      return res.redirect('back');
    }
    res.render('input', { painSubmit: data ? data.painSubmit : false });
  });
});

// Post the pain level to the server
router.post('/pain', (req, res) => {
  if (!res.locals.currentUser) {
    req.flash('error', 'Please sign up or sign in first!');
    return res.redirect('/register');
  }
  let newDate = new Date(req.body.date);
  let day = newDate.getDay();
  let data = parseInt(req.body.pain);
  let currentUser = res.locals.currentUser;
  Pain.findOne({ userId: currentUser._id }).then((pain) => {
    let dailyPainArr;
    if (pain) {
      let lastUpdatedDate = new Date(pain.date);
      pain.painSubmit =
        newDate.getDate() - lastUpdatedDate.getDate() !== 0
          ? false
          : pain.painSubmit;
      pain = painLevels(data, day, pain, 'daily', 7);
      pain.painSubmit = true;
      pain.date = newDate;
      pain.save((err) => {
        if (err) {
          return res.redirect('/pain');
        }
        return res.redirect('/report');
      });
    } else {
      dailyPainArr = generateNewDailyArr(data, day);
      let secPain = new Pain({
        userId: currentUser._id,
        daily: [dailyPainArr],
        date: newDate,
        painSubmit: true,
      });
      secPain.save((err) => {
        if (err) {
          return res.redirect('/pain');
        }
        return res.redirect('/report');
      });
    }
  });
});

// Get the report page
router.get('/report', (req, res) => {
  if (!res.locals.currentUser) {
    req.flash('error', 'Please sign up or sign in first!');
    return res.redirect('/login');
  } else {
    return res.render('report');
  }
});

// API routes for getting pain data
router.get('/api/pain/:userId/:timeframe?', (req, res) => {
  let userId = req.params.userId;
  let timeframe = req.params.timeframe;
  Pain.findOne({ userId }, (err, data) => {
    if (err) {
      return res.json({ error: `No user found!` });
    } else if (data === null) {
      return res.json({ success: 'No data!' });
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
            error: `${timeframe} is not a valid timeframe. You can only use daily, weekly and montly instead.`,
          });
        }
      } else {
        return res.json(data);
      }
    }
  });
});

const generateNewDailyArr = (painLevel, day, painArr, painSubmit) => {
  let newArr;
  if (painSubmit && painArr.length > 0) {
    newArr = [...painArr];
    newArr.pop();
    newArr.push(painLevel);
    return newArr;
  } else {
    newArr = painArr && painArr.length < 7 ? [...painArr] : [];
    for (let i = newArr.length; i < day; i++) {
      newArr.push(0);
    }
    newArr.push(painLevel);
    return newArr;
  }
};

const painLevels = (painNum, day, pain, timeframe, length) => {
  let time = pain[timeframe];
  if (time.length === 0) {
    time = [];
    time.push([painNum]);
    pain[timeframe] = [...time];
    return pain;
  } else {
    let index = time.length - 1;
    painNum =
      timeframe === 'daily' && day
        ? generateNewDailyArr(painNum, day, time[index], pain.painSubmit)
        : painNum;
    if (time[index].length < length) {
      timeframe === 'daily'
        ? (time[index] = painNum)
        : time[index].push(painNum);
      pain[timeframe] = [...time];
      return pain;
    } else if (time[index].length === length) {
      let painTotal = time[index].reduce((tot, e) => tot + e);
      time.push(timeframe === 'daily' ? painNum : [painNum]);
      pain[timeframe] = [...time];
      return timeframe === 'daily'
        ? painLevels(
            parseInt(Math.ceil(painTotal / length)),
            undefined,
            pain,
            'weekly',
            4
          )
        : timeframe === 'weekly'
        ? painLevels(
            parseInt(Math.ceil(painTotal / length)),
            undefined,
            pain,
            'monthly',
            12
          )
        : pain;
    }
  }
};

module.exports = router;
