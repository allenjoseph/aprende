namespace App{

    export class Authentication {
        
        /* @ngInject */
        constructor($rootScope: ng.IRootScopeService){
            
            $rootScope.$on('$stateChangeStart', (event, toState) => {});
        }
    }
}