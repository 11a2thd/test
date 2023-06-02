const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)
const Buy = new Schema({
  user_name: { type: String, require: true},
  email: {type: String, require: true},
  phone: {type: String, require: true},
  full_name: { type: String },
  address: {type: String, require: true},
  password: {type: String, require: true},
  sale_code: [],
  selected: [
    {
      check : { type: String},
      name: { type: String},
      img: { type: String },
      quantity: {
        value: { type: Number },
        maxValue: { type: Number },
      },
      price: { type: Number },
    }, {
      timestamps: true,
    }
  ],
  paid: [
    {
      stt: { type: Number },
      payment: { type: String },
      products: [
        {
          name: { type: String },
          img: { type: String },
          quantity: { type: Number },
          price: { type: Number },
        }
      ],
      total: { 
        old: { type: Number },
        new: { type: Number },
      },
      createdAt: { type: Date, default: Date.now },
    }, {
      timestamps: true,
    }
  ]
  
}, {
  timestamps: true,
});

module.exports = mongoose.model('buy', Buy);