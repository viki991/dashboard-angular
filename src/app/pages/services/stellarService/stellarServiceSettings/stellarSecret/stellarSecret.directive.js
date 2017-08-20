(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService.stellarServiceSettings')
        .directive('stellarSecret', stellarSecret);

    /** @ngInject */
    function stellarSecret() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/services/stellarService/stellarServiceSettings/stellarSecret/stellarSecret.html'
        };
    }
})();
