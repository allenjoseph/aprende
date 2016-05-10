(function(){
	'use strict';

	angular
		.module('app')
		.controller('Register', Register);

	Register.$inject = ['loginService','$state', '$uibModalInstance', '$rootScope'];

	function Register(loginService, $state, $uibModalInstance, $rootScope) {
		var vm = this;
		vm.validCode = false;
		vm.invalidCode = false;

		vm.validateCode = function(email, code){
			if(email, code){

				loginService.validRegister(email, code).then(function(token){
					$rootScope.token = token;
					vm.validCode = true;
					vm.invalidCode = false;
				})
				.catch(function(){
					vm.invalidCode = true;
				});
			}
		};

		vm.registerUser = function(name){
			if(name){
				var fields = {
					name: name,
					email: $rootScope.email
				};

				loginService.updateUser(fields).then(function(user){
					$rootScope.user = user;
					$state.go('home');
					$uibModalInstance.close();
				});
			}
		};
	}
})();