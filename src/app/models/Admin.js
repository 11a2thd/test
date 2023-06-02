const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)
const Admin = new Schema({
  user_name: { type: String, require: true},
  full_name: { type: String },
  email: {type: String, require: true},
  phone: {type: String, require: true},
  address: {type: String, require: true},
  password: {type: String, require: true},
}, {
  timestamps: true,
});

module.exports = mongoose.model('admin', Admin);