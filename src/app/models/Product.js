const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const Product = new Schema({
  name: { type: String},
  img: { type: String },
  quantity: {  type: Number },
  price: {  type: Number },
}, {
  timestamps: true,
})

module.exports = mongoose.model('product', Product);