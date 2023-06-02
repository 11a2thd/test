const Product = require('../models/Product')
const Buy = require('../models/Buy')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')

class ProductController{

        show(req, res, next){
            
            Promise.all([Product.findOne({ _id: req.params._id }).lean(), Buy.findOne({ user_name: req.params.slug0 }).lean()])
                .then(([product, buy]) => {
                    const sp = product
                    const bData = buy.selected
                    sp.price = String(sp.price)
                    for(var i = sp.price.length - 3; i > 0; i -= 3)
                    sp.price = sp.price.slice(0, i) + '.' + sp.price.slice(i)

                    res.render('products/show', {
                        buy: bData,
                        product: sp,
                        user_name: buy.user_name
                    })
                })
                .catch(next)
        }

        //GET
        create(req, res, next){
            res.render('products/create')
        }
        //POST
        store(req, res, next){
            const formData = req.body
            const product = new Product(formData);
            product.save()
            .then(() => res.redirect('/'))
            .catch(err => { console.log("Lỗi!!!") })
        }

        cart(req, res, next){

            Promise.all([Product.findOne({ _id: req.params._id }), Buy.findOne({ user_name: req.params.slug0})])
            .then(([product, buy]) => {
                // const formData = product._doc
                const formData = {
                    check : '',
                    name: product.name,
                    img: product.img,
                    quantity: {
                        value: Number(req.params.slug),
                        maxValue: product.quantity,
                    },
                    price: product.price,
                }
                 // fromData này sẽ có giá trị như product được trả về (Bao gồm vả _id của sản phẩm đó)
       
                var x = 0
                // Duyêt qua từng sản phẩm trong selection
                // Code này hiểu là: Khi người dùng mua lạo với số lượng mới thì nó sẽ được cập nhật vào trong cart
                buy.selected.forEach(function(cartProduct){
                    console.log(cartProduct)
                    if(cartProduct._id == req.params._id){
                        cartProduct.quantity.value = Number(req.body.soluong)
                        return x++
                    }
                })     
                
                if(x === 0){
                    formData._id = req.params._id
                    buy.selected.push(formData)
                }
                Buy.updateOne({ user_name: req.params.slug0 }, buy)
                    .then(() => res.redirect('/product/user/' + req.params.slug0 + '/' + product.name + '/' + product._id))
                    .catch(err => { console.log("1 Lỗi!!!") })
            })
            .catch(err => { console.log("2 Lỗi trong cart controoler!!!") })

        }
}

module.exports = new ProductController