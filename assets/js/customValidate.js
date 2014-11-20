$(document).ready(function(){
	$('#sig-up-form').validate({
		rules: {
			name: {
				require: true
			},
			email:{
				required: true,
				email: true
			},
			password: {
				minlength : 6,
				required: true
			},
			confirmation: {
				minlegth: 6,
				equalTo: "#password"
			}
		},
		success: function(element){
			element
			.text('OK!').addClass('valid');
		}
	});
});