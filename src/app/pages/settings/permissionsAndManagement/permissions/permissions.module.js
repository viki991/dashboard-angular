(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.permissions', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('settings.permissions', {
                url: '/permissions-and-management/:permissionGroupName/permissions',
                views: {
                    'generalSettings': {
                        controller: 'GeneralPermissionsCtrl',
                        templateUrl: 'app/pages/settings/permissionsAndManagement/permissions/permissions.html'
                    }
                },
                title: "Permissions"
            });
    }

})();
