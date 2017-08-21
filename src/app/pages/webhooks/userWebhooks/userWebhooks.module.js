(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks.userWebhooks', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('webhooks.userWebhooks', {
                url: '/user',
                views: {
                    'webhooksSettingsView': {
                        templateUrl: 'app/pages/webhooks/userWebhooks/userWebhooks.html',
                        controller: 'UserWebhooksCtrl'
                    }
                },
                params: {
                    secret: null
                },
                title: "User webhooks"
            });
    }

})();
