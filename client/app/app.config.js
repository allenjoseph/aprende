(function(){
    'user strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider){

        $httpProvider.interceptors.push('httpInterceptor');
    }
})();