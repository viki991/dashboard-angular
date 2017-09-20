(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('userPermissions', userPermissions);

    /** @ngInject */
    function userPermissions() {
        return {
            restrict: 'E',
            controller: 'UserPermissionsCtrl',
            templateUrl: 'app/pages/users/userDetails/userPermissions/userPermissions.html'
        };
    }
})();
