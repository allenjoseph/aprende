(function(){
	'use strict';

	angular
		.module('app')
		.directive('onEnter', onEnter);

	function onEnter(){
		var directive = {
			link: link
		};

		return directive;

		function link(scope, element, attrs){
			element.on('keypress', function(e){
				if(e.which === 13){
					scope.$apply(function () {
						scope.$eval(attrs.onEnter);
					});
					event.preventDefault();
				}
			});
		}
	}
})();