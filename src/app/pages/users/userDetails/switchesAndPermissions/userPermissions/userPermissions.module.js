(function () {
    'use strict';

    angular.module('BlurAdmin.pages.switchesAndPermissions.permissions', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('switchesAndPermissions.permissions', {
                url: '/permissions',
                title: 'User permissions',
                views:{
                    'switchesAndPermissionsView':{
                        templateUrl: 'app/pages/users/userDetails/switchesAndPermissions/userPermissions/userPermissions.html',
                        controller: "UserPermissionsCtrl"
                    }
                }
            });
    }

})();

