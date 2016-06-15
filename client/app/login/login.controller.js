(function(){
	'use strict';

	angular
		.module('app')
		.controller('Login', Login);

	Login.$inject = ['$rootScope', '$state', '$uibModal', 'loginService', 'Notification', 'socket'];

	function Login($rootScope, $state, $uibModal, loginService, Notification, socket) {
		var vm = this;

		vm.login = function(email, password){
			if(email){
				loginService.validateEmail(email).then(function(emailExist){
					if(emailExist && password){
						loginService.login(email, password).then(function(res){
							$rootScope.token = res.token;
							$rootScope.user = res.user;
							socket.identifyMe();
							$state.go('home');
						});
					}
					vm.showRegister = !emailExist;
				});
			}
		};

		vm.registerEmail = function(email){

			$rootScope.email = email;

			loginService.registerEmail(email).then(function(){
				$uibModal.open({
					animation: true,
					controller: 'Register as vm',
					templateUrl: 'login/register-modal.html'
				});
			})
			.catch(function(){
				Notification.error({
					message: 'Algo salió mal registrando el correo :( ...vuelve a intentarlo.',
					delay: 5000
				});
			});
		};
	}
})();