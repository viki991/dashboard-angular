(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.viewIco', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('icoService.viewIco', {
                url: '/:id',
                templateUrl: 'app/pages/services/icoService/icos/viewIco/viewIco.html',
                controller: "ViewIcoCtrl"
            });
    }

})();
