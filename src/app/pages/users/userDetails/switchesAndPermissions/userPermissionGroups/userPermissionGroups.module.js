(function () {
    'use strict';

    angular.module('BlurAdmin.pages.switchesAndPermissions.permissionGroups', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('switchesAndPermissions.permissionGroups', {
                url: '/permission-groups',
                title: 'Permission groups',
                views:{
                    'switchesAndPermissionsView':{
                        templateUrl: 'app/pages/users/userDetails/switchesAndPermissions/userPermissionGroups/userPermissionGroups.html',
                        controller: "UserPermissionGroupsCtrl"
                    }
                }
            });
    }

})();
