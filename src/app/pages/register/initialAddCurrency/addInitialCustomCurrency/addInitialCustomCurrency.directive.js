(function () {
    'use strict';

    angular.module('BlurAdmin.pages.initialAddCurrency')
        .directive('addInitialCustomCurrency', addInitialCustomCurrency);

    /** @ngInject */
    function addInitialCustomCurrency() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/register/initialAddCurrency/addInitialCustomCurrency/addInitialCustomCurrency.html'
        };
    }
})();