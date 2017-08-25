(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.icoServiceList', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('icoService.icoServiceList', {
                url: '/list',
                templateUrl: 'app/pages/services/icoService/icoServiceList/icoServiceList.html',
                controller: "IcoServiceListCtrl",
                title: 'List'
            });
    }

})();
