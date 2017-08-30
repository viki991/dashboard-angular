(function () {
    'use strict';

    angular.module('BlurAdmin.pages.initialAddCurrency', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('initialAddCurrency', {
                url: '/currency/add/initial',
                views:{
                    'admin':{
                        templateUrl: 'app/pages/register/initialAddCurrency/initialAddCurrency.html',
                        controller: 'InitialAddCurrencyCtrl'
                    }
                }
            });
    }

})();
