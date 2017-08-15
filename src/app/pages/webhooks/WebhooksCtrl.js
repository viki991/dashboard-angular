(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks')
        .controller('WebhooksCtrl', WebhooksCtrl);

    /** @ngInject */
    function WebhooksCtrl($scope,$location) {

        var vm = this;
        $scope.settingView = '';


        $scope.goToSetting = function(path){
            $scope.settingView = '';
            $location.path(path);
        };

    }
})();
