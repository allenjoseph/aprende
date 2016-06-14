(function() {
	'use strict';

	angular
		.module('routes.module', [
			'ui.router'
		])
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {

		$urlRouterProvider
			.otherwise('/login');

		$stateProvider
			.state('body', {
				abstract: true,
				templateUrl: 'layout/body.html'
			})
			.state('body.layout', {
				abstract: true,
				views: {
					'header@body': {templateUrl: 'layout/header.html'},
					'footer@body': {templateUrl: 'layout/footer.html'}
				}
			})
			.state('login', {
				parent: 'body',
				url: '/login',
				views: {
					'': {
						controller: 'Login as vm',
						templateUrl: 'login/login.html'
					},
					'footer@body': {templateUrl: 'layout/footer.html'}
				}
			})
			.state('home', {
				parent: 'body.layout',
				url: '/home',
				views: {
					'@body': {
						controller: 'Main as vm',
						templateUrl: 'main/main.html'
					}/*,
					'video-chat@home': {
						controller: 'VideoChat as vm',
						templateUrl: 'video-chat/video-chat.html'
					}*/
				}
			});
	}
})();
