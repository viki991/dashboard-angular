(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('addUserPermissionGroupView', addUserPermissionGroupView);

    /** @ngInject */
    function addUserPermissionGroupView() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/permissions/userPermissionGroups/addUserPermissionGroup/addUserPermissionGroup.html'
        };
    }
})();
