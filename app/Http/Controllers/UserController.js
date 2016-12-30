'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')

class UserController {
    * login(req, res) {
        yield res.sendView('login');
    }

    * loginSubmit(req, res) {
        try{
            var post = req.post();
            yield req.auth.attempt(post.email, post.password);
            res.redirect('/user/list');
        }catch(e){
            yield req
                .withOut('password')
                .andWith({ errors: [{
                    message:'Hibás jelszó/email páros!'
                }] })
                .flash()
            res.redirect('back')            
            return
        }
    }

    * logout(req, res) {
        yield req.auth.logout();
        res.redirect('/');
    }

    * register(req, res) {
        yield res.sendView('register');
    }

    * registerSubmit(req, res) {
        var post = req.post();
        var userData = {
            username:post.username,
            email:post.email.toLowerCase(),
            firstname:post.firstname,
            lastname:post.lastname,
            password:post.password,
            password2:post.password2
        };

        const validation = yield Validator.validateAll(userData, User.rules)

         if (validation.fails()) {
             yield req
                .withOut('password','password2')
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('back')
            return
         }

        delete userData.password2;
        userData.password = yield Hash.make(userData.password);

        var user = yield User.create(userData);
        yield user.save();

        yield req.auth.login(user);

        res.redirect('/')
    }


    * ajaxLogin(req, res) {
        try{
            var post = req.post();
            yield req.auth.attempt(post.email, post.password);
            res.ok({
                success:true
            });
        }catch(e){
            res.ok({
                success:false
            })
        }
    }


}

module.exports = UserController
