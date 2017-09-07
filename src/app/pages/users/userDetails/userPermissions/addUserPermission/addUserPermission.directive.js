(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('addUserPermission', addUserPermission);

    /** @ngInject */
    function addUserPermission() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/userPermissions/addUserPermission/addUserPermission.html'
        };
    }
})();
