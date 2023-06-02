const Product = require('../models/Product')
const Buy = require('../models/Buy')

class AdminController{
    show(req, res){
        Product.find({}).lean()
            .then(product => {
                const pData = product
                const bData = []
                pData.forEach(function(pData){
                    pData.price = String(pData.price)
                    for(var i = pData.price.length - 3; i > 0; i -= 3)
                    pData.price = pData.price.slice(0, i) + '.' + pData.price.slice(i)
                    
                })

                pData.reverse()
                res.render('home', {
                    product: pData
                })
            })
            .catch(err => console.log("admin1 Lỗi!!!"))
    }

    sort(req, res){
        Promise.all([Product.find({}).lean(), Buy.find({}).lean()])
        .then(([product, buy]) => {
            var pData = product
            var bData = []
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
            buy.forEach(function(buy){
                buy.selected.forEach(function(buy){
                    bData.push( buy )
                })
            })
            bData.forEach(function(bData){
                bData.price = String(bData.price)
                for(var i = bData.price.length - 3; i > 0; i -= 3)
                bData.price = bData.price.slice(0, i) + '.' + bData.price.slice(i)
                
            })
            if(req.params.slug !== 'oldest')
            pData.reverse()
            
            res.render('home', {
                product: pData,
                buy: bData
            })
        })
        .catch(err => console.log("Lỗi!!!"))
}

    showUser(req, res){
        Buy.find({}).lean()
            .then(users => {
                res.render('admin/usersManagement', {users})
            })
            .catch(err => res.render('admin lỗi!!!'))
    }
}

module.exports = new AdminController