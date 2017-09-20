(function () {
    'use strict';

    angular.module('BlurAdmin.pages.switchesAndPermissions', [
        'BlurAdmin.pages.switchesAndPermissions.permissionGroups',
        'BlurAdmin.pages.switchesAndPermissions.permissions'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('switchesAndPermissions', {
                url: '/user/:uuid/switches-and-permissions',
                templateUrl: 'app/pages/users/userDetails/switchesAndPermissions/switchesAndPermissions.html',
                controller: "SwitchesAndPermissionsCtrl",
                title: 'Switches and permissions'
            });
    }

})();