const mongoose = require('mongoose');

const PainSchema = new mongoose.Schema({
  userId: String,
  daily: Array,
  weekly: Array,
  monthly: Array,
  painSubmit: { type: Boolean, default: false },
});

module.exports = mongoose.model('Pain', PainSchema);
