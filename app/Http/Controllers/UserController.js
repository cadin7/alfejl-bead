'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')
const Telekocsi = use('App/Model/Telekocsi')

class UserController {
    * login(req, res) {
        yield res.sendView('login');
    }

    * loginSubmit(req, res) {
        try {
            var post = req.post();
            yield req.auth.attempt(post.email, post.password);
            res.redirect('/');
        } catch (e) {
            yield req
                .withOut('password')
                .andWith({
                    errors: [{
                        message: 'Bad credentials'
                    }]
                })
                .flash()
            res.redirect('back')
            console.log(e);
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
            username: post.username,
            email: post.email,
            password: post.password,
            aboutme: post.aboutme
        };

        const validation = yield Validator.validateAll(userData, User.rules)

        if (validation.fails()) {
            yield req
                .withOut('password')
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('back')
            return
        }


        userData.password = yield Hash.make(userData.password);

        var user = yield User.create(userData);
        yield user.save();

        req.auth.login(user);

        res.redirect('/login')
    }

    * profile(req, res) {

        var user = yield User.findBy('id', req.param('id'));
        yield res.sendView('profile', {
            user: user.toJSON()
        });
    }

    * edit(req, res) {
        var user = yield User.findBy('id', req.param('id'));

        yield res.sendView('editprofile', {
            user: user.toJSON()
        });
    }


    * editSubmit(req, res) {
        var post = req.post();
        var user = yield User.findBy('id', req.param('id'));

        user.password = post.password;

        user.password = yield Hash.make(user.password);

        yield user.save();

        res.redirect('/');
    }

    * ajaxLogin(req, res) {
        try {
            var post = req.post();
            yield req.auth.attempt(post.email, post.password);
            res.ok({
                success: true,
            });
        } catch (e) {
            res.ok({
                success: false
            })
        }
    }

     * ajaxRegister(request, response) {
		const user = new User()
		user.username = request.input('username')
		user.email = request.input('email')
		user.password = yield Hash.make(request.input('password'))
		user.aboutme = request.input('aboutme')
		
		try {
			yield user.save()
			response.ok({ success: true, messagetype: 'success', message : 'A regisztráció sikeres volt! Kérlek jelentkezz be!' })
			return
		}
		catch (error) {
			response.ok({ success: false, messagetype: 'danger', message : 'A regisztráció sikertelen volt!' })
			return
		}
	}
}

module.exports = UserController
