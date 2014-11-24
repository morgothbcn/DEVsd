/**
* Allow a logged-in user to see, edit and update her own profile
**/

module.exports = function(req, res , ok){
	var sessionUserMatchesId = req.session.User.id === req.param('id');
	var isAdmin = req.session.User.junta;

	//La id no coincide con la id del usuario y no es admin
	if(!(sessionUserMatchesId || isAdmin)){
		var noRightsError = [{name:'noRights', message:'You must be an admin.'}]
		req.session.flash = {
			err: noRightsError
		}

		res.redirect('/session/new');
		return;
	}
	ok();
};