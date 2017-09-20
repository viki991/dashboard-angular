(function () {
    'use strict';

    angular.module('BlurAdmin.pages.switchesAndPermissions')
        .directive('switchesAndPermissionsMenu', switchesAndPermissionsMenu);

    /** @ngInject */
    function switchesAndPermissionsMenu() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/switchesAndPermissions/switchesAndPermissionsMenu/switchesAndPermissionsMenu.html'
        };
    }
})();
