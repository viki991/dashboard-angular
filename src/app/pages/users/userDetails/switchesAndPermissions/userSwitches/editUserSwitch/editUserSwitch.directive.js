(function () {
    'use strict';

    angular.module('BlurAdmin.pages.switchesAndPermissions.userSwitches')
        .directive('editUserSwitch', editUserSwitch);

    /** @ngInject */
    function editUserSwitch() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/switchesAndPermissions/userSwitches/editUserSwitch/editUserSwitch.html'
        };
    }
})();
