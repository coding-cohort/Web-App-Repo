const mongoose = require('mongoose'),
  passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: String,
  surname: String,
  email: { type: String, unique: true, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);
