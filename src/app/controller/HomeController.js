const Product = require('../models/Product')
const Buy = require('../models/Buy')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')

class HomeController{

    index(req, res){
        Product.find({}).lean()
            .then(product => {
                const pData = product
                pData.forEach(function(pData){
                    pData.price = String(pData.price)
                    for(var i = pData.price.length - 3; i > 0; i -= 3)
                    pData.price = pData.price.slice(0, i) + '.' + pData.price.slice(i)
                    
                })

                // buy.selected.forEach(function(buy){
                //     bData.push( buy )
                // })

                    
                pData.reverse()
                res.cookie('user_id', '');
                res.cookie('user_name', '');
                res.render('home', {
                    product: pData
                })
            })
            .catch(err => console.log("HOME1 Lỗi!!!"))
    }

    

    showRegister(req, res, next){
        res.render('users/register')
    }
    register(req, res, next){
        // console.log(req.body);
        // console
        //res.json(req.body);
        var{user_name, email, password, password2} = req.body;
        user_name = user_name.toLowerCase();
        email = email.toLowerCase();
        const value = {
            user_name: user_name,
            email: email,
            password: password,
            password2: password2
        }
        var errors = [];
        var flag = false;
        
        // Fill o
        var Tong=0;
        if(user_name == '' || email == '' || password == '' || password2 == ''){
            errors.push("Hãy điền đầy đủ thông tin!!!");
            flag = true;
            return res.render('users/register',{
                value,
                flag,
                errors
            })
        }else if(password.length < 6){
            errors.push("Mật khẩu phải dài hơn 6 ký tự!!!");
            flag = true;
            return res.render('users/register',{
                value,
                flag,
                errors
            })
        }else if(password !== password2){
            errors.push("Mật khẩu nhập lại không khớp!!!");
            flag = true;
            return res.render('users/register',{
                value,
                flag,
                errors
            })
        }else{
            Buy.find({})
            .then(users => {
                for(var i = 0; i < users.length; i++){
                    if(users[i].user_name === user_name){
                        errors.push("Tên đăng nhập đã tồn tại!!!");
                        flag = true;
                        return res.render('users/register',{
                            value,
                            flag,
                            errors
                        })
                        
                    }else if(users[i].email === email){
                        errors.push("Email đã tồn tại!!!");
                        flag = true;
                        return res.render('users/register',{
                            value,
                            flag,
                            errors
                        })
                    }
                }
                const newUser = new Buy({email, user_name, password});
                newUser.save()
                .then(() => res.render('users/login'))
                .catch(next);
            })
            .catch(err => console.log('Lỗi 1!!!'))
        }
    }

    showLogin(req, res, next){
        // res.send("Testing success!!")
        res.render('users/login')
    }
    login(req, res, next){
        var errors=[];
        var flag = false;
        var {email, password} = req.body;
        email = email.toLowerCase();
        const value = {
            user_name: email,
            password: password
        }
        if(email === '' || password === ''){
            errors.push("Điền đầy đủ thông tin!!!");
            flag = true;
            return res.render('users/login',{
                value,
                flag,
                errors
            });
        }
        if(email === 'ngocnhatbruh' || email === 'ngocnhatbruh@gmail.com'){
            if(password === '123456'){
                res.cookie('user_name', 'ngocnhatbruh');
                return res.redirect('/admin/ngocnhatbruh')
            }else{
                errors.push("Mật khẩu sai!!!");
                flag = true;
                return res.render('users/login',{
                    value,
                    flag,
                    errors
                });
            }
        }
        Buy.find({})
            .then(users => {
                for(var i = 0; i < users.length; i++){
                    if(users[i].email === email || users[i].user_name === email){
                        if(users[i].password === password){
                            res.cookie('user_name', email);
                            return res.redirect('/user/' + users[i].user_name)
                        }else{
                            errors.push("Mật khẩu sai!!!");
                            flag = true;
                            return res.render('users/login',{
                                value,
                                flag,
                                errors
                            });
                        }

                    }

                }
                errors.push("Tên đăng nhập sai!!!");
                flag = true;
                return res.render('users/login',{
                    value,
                    flag,
                    errors
                })
            })
           .catch(err => console.log('Lỗi 2!!!'))
    }

    sort(req, res){
        
    }
}

module.exports = new HomeController
