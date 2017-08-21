(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.ethereumService.ethereumServiceSettings')
        .directive('hdKeys', hdKeys);

    /** @ngInject */
    function hdKeys() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/services/ethereumService/ethereumServiceSettings/hdKeys/hdKeys.html'
        };
    }
})();
