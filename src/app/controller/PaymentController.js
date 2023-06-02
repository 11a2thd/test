const Product = require('../models/Product')
const Buy = require('../models/Buy')
const { response } = require('express')

class PaymentController{

    show(req, res, next){

        Buy.findOne({ user_name: req.params.slug0 }).lean()
        .then(buy => {
            var bData = []
            buy.selected.forEach(product => {
                if(product.check === "checked")
                bData.push(product)
            })

            res.render('products/payment', {
                buy: bData,
                buy1: buy,
                user_name: buy.user_name
            })
        })
        .catch(err => console.log("Lỗi!!!"))
    }

    paid(req, res){
        
        Buy.findOne({ user_name: req.params.slug0 })
            .then(buy => {
                
                buy.full_name = req.body.kh_ten
                buy.address = req.body.kh_diachi
                buy.phone = req.body.kh_dienthoai
                var tong = 0
                var a = {
                      stt: 0,
                      payment: "",
                      products: [
                        {
                            quantity: 0,
                            name: "",
                            img: "",
                            price: 0,
                            _id: ""
                        }
                      ],
                      sale_code: 0,
                      total: { 
                        old: 0,
                        new: 0,
                      }
                    }
                
                a.stt = buy.paid.length + 1
                if(req.params.slug2 === '1')
                a.payment = 'Tiền mặt'
                else if(req.params.slug2 === '2')
                a.payment = 'Chuyển khoản'
                var i = 0
                buy.selected.forEach(function (product, index) {
                    
                    if(product.check === 'checked'){
                        
                        a.products[i] = {
                            quantity: product.quantity.value,
                            name: product.name,
                            img: product.img,
                            price: product.price,
                            _id: product._id
                        }
                        
                        tong += (a.products[i].quantity * a.products[i].price)
                        i++
                    }
                })
                
                a.total.old = tong
                a.total.new = Number(req.params.slug1)              
                
                // Thêm sản phẩm mới vào đầu
                if(i !== 0){
                    buy.paid.unshift(a)
                    // Xoá sản phẩm vừa thêm ra khỏi selected
                    buy.selected.splice(buy.selected)
                }
                
                
                Buy.updateOne({ user_name: req.params.slug0 }, buy)
                .then(() => res.redirect('/payment/user/' + req.params.slug0 + '/succeeded'))
                .catch(err => { console.log("1 Lỗi!!!") })
            })
            .catch(err => { console.log("3 Lỗi!!!") })
    }

    succeeded(req, res){
        Buy.findOne({ user_name: req.params.slug0 }).lean()
        .then(buy => {
            var bData = []
            buy.selected.forEach(product => {
                if(product.check === "checked")
                bData.push(product)
            })

            res.render('products/succeeded', {
                buy: bData,
                user_name: buy.user_name
            })
        })
        .catch(err => console.log("Lỗi!!!"))
    }

}

module.exports = new PaymentController