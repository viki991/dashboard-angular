(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks')
        .controller('WebhooksCtrl', WebhooksCtrl);

    /** @ngInject */
    function WebhooksCtrl($scope,environmentConfig,Upload,$http,cookieManagement,errorToasts,$window,$timeout,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.settingView = 'accountInfo';


        $scope.goToSetting = function(path){
            $scope.settingView = '';
            $location.path(path);
        };
    }
})();
