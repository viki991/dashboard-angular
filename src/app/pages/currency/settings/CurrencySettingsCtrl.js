(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .controller('CurrencySettingsCtrl', CurrencySettingsCtrl);

    /** @ngInject */
    function CurrencySettingsCtrl($scope,$location,$stateParams) {

        var vm = this;
        $scope.currencyCode = $stateParams.currencyCode;

        $scope.goToCurrencySetting = function(settingPath){
            $location.path(settingPath);
        };

    }
})();
