(function(){
	'use strict';

	angular
		.module('app')
		.factory('loginService', loginService);

	loginService.$inject = ['$http', '$q'];

	function loginService($http, $q){
		var service = {
			validateEmail: emailIsValid,
			registerEmail: registerEmail,
			validRegister: validRegister,
			updateUser: updateUser
		};

		return service;

		function emailIsValid(email){

			var deferred = $q.defer();

			$http
				.post('validate-email', {email: email})
				.then(onFulfilled, onRejected);

			return deferred.promise;

			function onFulfilled(res){
				if(res.data.ok){
					deferred.resolve(res.data.data);
				}else{
					deferred.reject(res.data.error);
				}
			}

			function onRejected(error){
				deferred.reject(error);
			}
		}

		function registerEmail(email){
			var deferred = $q.defer();

			$http
				.post('register-email', {email: email})
				.then(onFulfilled, onRejected);

			return deferred.promise;

			function onFulfilled(res){
				if(res.data.ok){
					deferred.resolve(res.data.data);
				}else{
					deferred.reject(res.data.error);
				}
			}

			function onRejected(error){
				deferred.reject(error);
			}
		}

		function validRegister(email, code){
			var deferred = $q.defer();

			$http
				.post('validate-register', {email: email, code: code})
				.then(onFulfilled, onRejected);

			return deferred.promise;

			function onFulfilled(res){
				if(res.data.ok){
					deferred.resolve(res.data.data);
				}else{
					deferred.reject(res.data.error);
				}
			}

			function onRejected(error){
				deferred.reject(error);
			}
		}

		function updateUser(fields){
			var deferred = $q.defer();

			$http
				.put('users', fields)
				.then(onFulfilled, onRejected);

			return deferred.promise;

			function onFulfilled(res){
				if(res.data.ok){
					deferred.resolve(res.data.data);
				}else{
					deferred.reject(res.data.error);
				}
			}

			function onRejected(error){
				deferred.reject(error);
			}
		}

		function login(email, password){
			var deferred = $q.defer();

			$http
				.post('login', {email: email, password: password})
				.then(onFulfilled, onRejected);

			return deferred.promise;

			function onFulfilled(res){
				if(res.data.ok){
					deferred.resolve(res.data.data);
				}else{
					deferred.reject(res.data.error);
				}
			}

			function onRejected(error){
				deferred.reject(error);
			}
		}
	}
})();