(function () {
    'use strict';

    angular.module('BlurAdmin.pages.switchesAndPermissions')
        .controller('SwitchesAndPermissionsCtrl', SwitchesAndPermissionsCtrl);

    /** @ngInject */
    function SwitchesAndPermissionsCtrl($scope,$location,$stateParams) {

        var vm = this;
        vm.uuid = $stateParams.uuid;

        $scope.goToSetting = function(path){
            $location.path('user/' + vm.uuid + '/switches-and-permissions/' + path);
        };

        $scope.goBackToUser = function () {
            $location.path('user/' + vm.uuid);
        };

    }
})();
