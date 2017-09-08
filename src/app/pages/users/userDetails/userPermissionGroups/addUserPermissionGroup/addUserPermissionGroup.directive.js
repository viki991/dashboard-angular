(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('addUserPermissionGroupView', addUserPermissionGroupView);

    /** @ngInject */
    function addUserPermissionGroupView() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/userPermissionGroups/addUserPermissionGroup/addUserPermissionGroup.html'
        };
    }
})();
