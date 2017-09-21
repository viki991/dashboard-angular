(function () {
    'use strict';

    angular.module('BlurAdmin.pages.permissions', [
        'BlurAdmin.pages.permissions.permissionGroups',
        'BlurAdmin.pages.permissions.userPermissions'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('permissions', {
                url: '/user/:uuid/switches-and-permissions',
                templateUrl: 'app/pages/users/userDetails/permissions/permissions.html',
                controller: "PermissionsCtrl",
                title: 'Permissions'
            });
    }

})();