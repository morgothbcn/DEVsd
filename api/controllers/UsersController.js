/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function(req,res){
		
		res.view();
		
	},

	create: function(req, res, next){
		//Create a User with the params sent from the sign-up form --> new.ejs
		Users.create(req.params.all(),function userCreated(err, user){
			//If there's an error
			if(err){
				console.log(err);
				req.session.flash = {
					err:err
				}
				//If error redirect back to sign-up page
				return res.redirect('/users/new');
			} 

			//Log user in
			req.session.authenticated = true;
			req.session.User = user;
			//After successfully creating the user redirect to the show action
			//res.json(user);
			res.redirect('/users/show/'+user.id);
		});
	},

	//render the profile view (e.g. /views/show.ejs)
	show: function(req,res,next){
		Users.findOne(req.param('id'), function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next();
			res.view({
				user:user
			});

		});
	},

	index: function(req,res, next){
		//Get an array of all users in the User collection(e.g. table)
		Users.find(function foundUsers(err, users){
			if(err) return next(err);
			//pass the array down to the /views/index.ejs page
			res.view({
				users:users
			});
		});
	},

	edit: function (req, res,next){
		//Find the user from the id passed in via params
		Users.findOne(req.param('id'),function foundUser(err, user){
			if(err) return next(err);
			if(!user) return next();

			res.view({
				user:user
			});
		});
	},

	//proces the info from edit view
	update: function(req, res, next){
		var junta = false;
		if(req.session.User.junta){
			//console.log(req.param('junta'));
			if(req.param('junta') === 'seleccionado'){
				junta = true;	
			}else{
				junta = false;
			}

			if(req.param('porlado') === 'seleccionado'){
				porlado = true;	
			}else{
				porlado = false;
			}
		 
			var userObj = {
				name: req.param('name'),
				lastName: req.param('lastName'),
				email: req.param('email'),
				junta: junta,
				porlado:porlado,
				dni: req.param('dni'),
				birthDate: req.param('birthDate'),
				altaDate: req.param('altaDate'),
				bajaDate: req.param('bajaDate'),
				phone: req.param('phone')
			}
		}else{
			var userObj = {
				name: req.param('name'),
				lastName: req.param('lastName'),
				email: req.param('email'),
				dni: req.param('dni'),
				birthDate: req.param('birthDate'),
				phone: req.param('phone')
			}
		}

		console.log("update datos");
		console.log(userObj);
		console.log("update final");

		Users.update(req.param('id'), userObj, function userUpdate(err){
			if(err)
				return res.redirect('/users/edit/'+req.param('id'));
			res.redirect('/users/show/'+req.param('id'));
		});
	},

	destroy: function (req, res, next){
		Users.findOne(req.param('id'), function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next('User dosn\'t exist.');

			Users.destroy(req.param('id'), function userDestroy(err){
				if(err) return next(err);
			});
		});
	}
};

