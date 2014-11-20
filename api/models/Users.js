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
			type: 'boolean'
		},

		junta:{
			type: 'boolean'
		},



		toJSON: function(){
			var obj = this.toObject();
			delete obj.password;
			delete obj.confirmation;
			delete obj.encryptedPassword;
			delete obj._csrf;

			return obj;
		}



	}
};

