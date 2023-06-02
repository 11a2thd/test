const Product = require('../models/Product')
const Buy = require('../models/Buy')

class OrderController{

    show(req, res, next){
        
        Buy.findOne({ user_name: req.params.slug }).lean()
        .then(buy => {
            var bData = buy.paid
            var b1Data = buy.selected
            var pData = []
            var time = []
            bData.forEach(function(bData){
                bData.products.forEach(function(Data){
                    Data.price = String(Data.price)
                    for(var i = Data.price.length - 3; i > 0; i -= 3)
                    Data.price = Data.price.slice(0, i) + '.' + Data.price.slice(i)
                    pData.push(Data)
                })
                time.push(bData.createdAt)
                
                bData.total.old = String(bData.total.old)
                for(var i = bData.total.old.length - 3; i > 0; i -= 3)
                bData.total.old = bData.total.old.slice(0, i) + '.' + bData.total.old.slice(i)

                bData.total.new = String(bData.total.new)
                for(var i = bData.total.new.length - 3; i > 0; i -= 3)
                bData.total.new = bData.total.new.slice(0, i) + '.' + bData.total.new.slice(i)
            })
            // res.json(time)
            res.render('products/order', {
                buy1: bData,
                buy: b1Data,
                time: time,
                products: pData,
                user_name: buy.user_name,
            })
        })
        .catch(err => console.log("Lỗi!!!"))
    }

}

module.exports = new OrderController