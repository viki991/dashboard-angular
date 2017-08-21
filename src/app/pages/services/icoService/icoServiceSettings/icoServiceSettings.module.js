(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.icoServiceSettings', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('icoServiceSettings', {
                url: '/services/ico/settings',
                templateUrl: 'app/pages/services/icoService/icoServiceSettings/icoServiceSettings.html',
                controller: "IcoServiceSettingsCtrl",
                title: 'Settings'
            });
    }

})();
