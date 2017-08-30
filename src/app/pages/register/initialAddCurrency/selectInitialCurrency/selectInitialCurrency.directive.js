(function () {
    'use strict';

    angular.module('BlurAdmin.pages.initialAddCurrency')
        .directive('selectInitialCurrency', selectInitialCurrency);

    /** @ngInject */
    function selectInitialCurrency() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/register/initialAddCurrency/selectInitialCurrency/selectInitialCurrency.html'
        };
    }
})();