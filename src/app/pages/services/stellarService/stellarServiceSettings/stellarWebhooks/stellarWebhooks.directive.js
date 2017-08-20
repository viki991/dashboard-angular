(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService.stellarServiceSettings')
        .directive('stellarWebhooks', stellarWebhooks);

    /** @ngInject */
    function stellarWebhooks() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/services/stellarService/stellarServiceSettings/stellarWebhooks/stellarWebhooks.html'
        };
    }
})();
