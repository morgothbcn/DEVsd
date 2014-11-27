/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
	'new': function(req, res){
		//console.log(res.session.flash);
		res.view('session/new');
	},

	create: function(req,res,next){
		//Revisar si se han pasado los parametros por form
		if(!req.param('email')|| !req.param('password')){
			var usernamePasswordRequiredError = [{name:'usernamePasswordRequired', message: 'You must enter both a username and password.'}]

			//Recordar que este err es el objeto que pasamos (aka flash.err), valor del cual es otro objeto con clave usernamePasswordrequiredError
			req.session.flash = {
				err: usernamePasswordRequiredError
			}
			
			return res.redirect('/session/new');
		}

		//Intentar localizar al usuario por su email
		Users.findOneByEmail(req.param('email'), function foundUser(err,user){
			if(err) 
				return next(err);

			if(!user){
				var noAccountError = [{name: 'noAccount',message:'the email address '+ req.param('email')+' not found.'}];
				req.session.flash = {
					err: noAccountError
				}
			
				return res.redirect('/session/new');
			}

			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid){
				if(err)
					return next(err);
				if(!valid){
					var usernamePasswordMismatchError = [{name:'usernamePasswordMismatch',message:'Invalid username and password combination.'}];
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					return res.redirect('/session/new');
				}

				req.session.authenticated = true;
				req.session.User = user;
				//Si el usuario se trata de un admin
				//Esto lo c
				if(req.session.User.admin){
					return res.redirect('/users');
				}
				res.redirect('/users/show/'+user.id);
			});
		});
	},

	destroy: function(req, res, next){
		req.session.destroy();
		res.redirect('/session/new');
	}
};

