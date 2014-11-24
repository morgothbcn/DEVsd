/**
* Allow any authenticated user
*/ 

module.exports = function (req, res, ok){
	if(req.session.User && req.session.User.junta){
		return ok();
	}

	//User is not allowed
	else{
		var requireAdminError = [{name: 'requireAdminError', message: 'You must be an admin.'}]
		req.session.flash = {
			err : requireAdminError
		}
		res.redirect('/session/new');
		return;
	}
};