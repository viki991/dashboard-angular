(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.addIcoPhase', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('icoService.addIcoPhase', {
                url: '/:id/phase/add',
                templateUrl: 'app/pages/services/icoService/icos/phases/addPhase/addPhase.html',
                controller: "AddPhaseCtrl"
            });
    }

})();
