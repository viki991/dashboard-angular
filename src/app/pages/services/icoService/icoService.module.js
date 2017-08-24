(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService', [
        'BlurAdmin.pages.services.icoService.icoServiceSettings'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('icoService', {
                url: '/services/ico',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract:true,
                title: 'ICO service'
            });
        $urlRouterProvider.when("/services/ico", "/services/ico/settings");
    }

})();
