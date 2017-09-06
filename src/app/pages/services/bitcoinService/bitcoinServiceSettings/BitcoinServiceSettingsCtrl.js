(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.bitcoinService.bitcoinServiceSettings')
        .controller('BitcoinServiceSettingsCtrl', BitcoinServiceSettingsCtrl);

    /** @ngInject */
    function BitcoinServiceSettingsCtrl($scope) {
        $scope.bitcoinSettingView = '';
        $scope.loadingHdkeys =  true;
        $scope.addingHdkey =  false;

        $scope.goToBitcoinSetting = function (setting) {
            $scope.bitcoinSettingView = setting;
        };
    }

})();
