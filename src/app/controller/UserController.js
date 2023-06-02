const mongoose = require('mongoose');
const Product = require('../models/Product')
const Buy = require('../models/Buy')
const bcrypt = require('bcrypt');

class userController{

    show(req, res, next){
        Promise.all([Product.find({}).lean(), Buy.findOne({ user_name: req.params.slug }).lean()])
            .then(([product, buy]) => {
                const pData = product
                const bData = []
                pData.forEach(function(pData){
                    pData.price = String(pData.price)
                    for(var i = pData.price.length - 3; i > 0; i -= 3)
                    pData.price = pData.price.slice(0, i) + '.' + pData.price.slice(i)
                    
                })
                res.render('home', {
                    product: pData,
                    buy: buy.selected,
                    user_name: buy.user_name
                })
            })
            .catch(err => console.log("Lỗi!!!"))
    }
    showInfo(req, res, next){
        Buy.findOne({ user_name: req.params.slug }).lean()
            .then(buy => {
                res.render('users/info', {
                    buy: buy.selected,
                    buy1: buy,
                    user_name: buy.user_name
                })
            })
            .catch(err => console.log("Lỗi!!!"))
        
    }

    sort(req, res){
        
        Promise.all([Product.find({}).lean(), Buy.findOne({ user_name: req.params.slug }).lean()])
        .then(([product, buy]) => {
            var pData = product
            if(req.params.slug === 'price-ascending')
            pData.sort((a, b) => b.price - a.price) 
            else if(req.params.slug === 'price-descending')
            pData.sort((a, b) => a.price - b.price);
            else if(req.params.slug === 'price-lower-20')
            pData = pData.filter(function(value) {
                return value.price < 20000000;
            });
            else if(req.params.slug === 'price-20-to-40')
            pData = pData.filter(function(value) {
                if(value.price >= 20000000 && value.price <= 40000000)
                return value;
            });
            else if(req.params.slug === 'price-40-to-70')
            pData = pData.filter(function(value) {
                if(value.price >= 40000000 && value.price <= 70000000)
                return value;
            });
            else if(req.params.slug === 'price-upper-70')
            pData = pData.filter(function(value) {
                return value.price > 70000000;
            });

            pData.forEach(function(pData){
                pData.price = String(pData.price)
                for(var i = pData.price.length - 3; i > 0; i -= 3)
                pData.price = pData.price.slice(0, i) + '.' + pData.price.slice(i)
                
            })
            
            if(req.params.slug !== 'oldest')
            pData.reverse()
            
            res.render('home', {
                product: pData,
                buy: buy
            })
        })
        .catch(err => console.log("User2 Lỗi!!!"))
}

    cart(req, res){
        Promise.all([Product.findOne({ _id: req.params._id }), Buy.findOne({ user_name: req.params.slug })])
            .then(([product, buy]) => {
                var formData = {...{ check: "" }, ...product._doc}
                formData.quantity = {
                    value: 1,
                    maxValue: product.quantity
                }

                var x = 0
                buy.selected.forEach(function(cartProduct){
                    if(cartProduct._id == req.params._id)
                    return x++
                })
                if(x === 0)
                buy.selected.push(formData)
                Buy.updateOne({ user_name: req.params.slug }, buy)
                .then(() => {
                    res.redirect('/user/' + req.params.slug)
                })
                .catch(err => { console.log("cart1 Lỗi!!!") })
            })
            .catch(err => { console.log("cart2 Lỗi!!!") })
        
    }
}

module.exports = new userController;