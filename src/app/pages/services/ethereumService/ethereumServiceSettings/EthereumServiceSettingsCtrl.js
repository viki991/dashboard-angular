(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.ethereumService.ethereumServiceSettings')
        .controller('EthereumServiceSettingsCtrl', EthereumServiceSettingsCtrl);

    /** @ngInject */
    function EthereumServiceSettingsCtrl($scope,$http,cookieManagement,toastr,errorToasts,$state) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.ethereumSettingView = '';
        $scope.loadingHdkeys =  true;
        $scope.addingHdkey =  false;

        $scope.goToEthereumSetting = function (setting) {
            $scope.ethereumSettingView = setting;
        };

    }
})();
