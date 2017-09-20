(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('addUserPermissionGroupView', addUserPermissionGroupView);

    /** @ngInject */
    function addUserPermissionGroupView() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/switchesAndPermissions/userPermissionGroups/addUserPermissionGroup/addUserPermissionGroup.html'
        };
    }
})();
