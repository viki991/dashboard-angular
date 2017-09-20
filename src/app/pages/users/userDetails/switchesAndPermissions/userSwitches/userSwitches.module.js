(function () {
    'use strict';

    angular.module('BlurAdmin.pages.switchesAndPermissions.userSwitches', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('switchesAndPermissions.userSwitches', {
                url: '/user-switches',
                title: 'Switches',
                views:{
                    'switchesAndPermissionsView':{
                        templateUrl: 'app/pages/users/userDetails/switchesAndPermissions/userSwitches/userSwitches.html',
                        controller: "UserSwitchesCtrl"
                    }
                }
            });
    }

})();
