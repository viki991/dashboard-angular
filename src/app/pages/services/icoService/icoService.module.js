(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService', [
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('icoService', {
                url: '/services/ico',
                abstract:true,
                title: 'ICO service'
            });
        $urlRouterProvider.when("/services/ico", "/services/ico/settings");
    }

})();
