/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

  	attributes:{
		email: {
			type: 'string',
			email: true,
			required: true,
			unique: true
		},

		name:{
			type: 'string'
		},

		lastName:{
			type: 'string'
		},

		encryptedPassword:{
			type:'string'
		},

		dni:{
			type: 'string'
		},

		bithDate:{
			type: 'date'
		},

		altaDate:{
			type: 'date'
		},

		bajaDate:{
			type: 'date'
		},

		porlado:{
			type: 'boolean',
			defaultsTo: false
		},

		junta:{
			type: 'boolean',
			defaultsTo: false
		},

		phone:{
			type: 'integer',
			maxLength: 9,
			minLength: 9
		},


		toJSON: function(){
			var obj = this.toObject();
			delete obj.password;
			delete obj.confirmation;
			delete obj.encryptedPassword;
			delete obj._csrf;

			return obj;
		}
	},


	beforeCreate: function(values, next){
		//Chequear que realmente el pass y la confirm son iguales antes de continuar
		if(!values.password || values.password != values.confirmation)
			return next({err: ["Password doesn't match password confirmation"]});

		require('bcrypt').hash(values.password,10, function passwordEncrypted(err, encryptedPassword){
			if(err) return next(err);
			values.encryptedPassword = encryptedPassword;
			//values.online = true;
			next();
		});
	}
};

