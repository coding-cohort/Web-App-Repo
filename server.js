const express = require('express'),
  bodyParser = require('body-parser'),
  expressSession = require('express-session'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  methodOverride = require('method-override'),
  flash = require('connect-flash'),
  dotenv = require('dotenv'),
  seedDB = require('./seeds'),
  User = require('./models/User');

const app = express();
dotenv.config();

// Server configuration and middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.use(
  expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Databese connection
const uri = process.env.DATABASEURL || 'mongodb://localhost/debbie';
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('successful'))
  .catch((err) => console.log('******** ' + err.message + ' ********'));

// Seed the DB
// seedDB();

// Requiring Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

app.listen(process.env.PORT, () => {
  console.log('Debbie server has started!');
});
