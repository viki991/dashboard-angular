(function () {
    'use strict';

    angular.module('BlurAdmin.pages.switchesAndPermissions.userSwitches')
        .directive('createUserSwitch', createUserSwitch);

    /** @ngInject */
    function createUserSwitch() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/switchesAndPermissions/userSwitches/createUserSwitch/createUserSwitch.html'
        };
    }
})();
