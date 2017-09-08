(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('userPermissionGroups', userPermissionGroups);

    /** @ngInject */
    function userPermissionGroups() {
        return {
            restrict: 'E',
            controller: 'UserPermissionGroupsCtrl',
            templateUrl: 'app/pages/users/userDetails/userPermissionGroups/userPermissionGroups.html'
        };
    }
})();
