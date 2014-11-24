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
		Users.update(req.param('id'), req.params.all(), function userUpdate(err){
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

