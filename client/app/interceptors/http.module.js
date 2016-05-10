(function(){
	'user strict';

	angular
	.module('http.module', [])
	.factory('httpInterceptor', interceptor);

	interceptor.$inject = ['$q', '$rootScope'];

	function interceptor($q, $rootScope){
		return {
			request: function(config) {
				if($rootScope.token){
					config.headers['x-access-token'] = $rootScope.token;
				}
				return config;
			}
		};
	}
})();