(function() {
	'use strict';

	angular
		.module('app', [
			'ngSanitize',
			'gettext',
			'partials.module',
			'routes.module',
			'http.module',
			'ui.bootstrap',
			'ui-notification'
		])
		.run(runBlock);

	runBlock.$inject = ['gettextCatalog', '$rootScope', '$state'];

	function runBlock(gettextCatalog, $rootScope, $state) {
		gettextCatalog.debug = true;

		$rootScope.emailPattern = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

		$rootScope.setLanguage = function(lang) {
			$rootScope.currentLanguage = lang;
			gettextCatalog.setCurrentLanguage(lang);
		};

		$rootScope.setLanguage('es');

		$rootScope.$on('$stateChangeSuccess', function(event, toState){
			if(toState.name !== 'login' && !$rootScope.user){
				$state.go('login');
			}
		});
	}
})();
