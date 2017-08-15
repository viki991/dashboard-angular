(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks.userWebhooks', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('webhooks.userWebhooks', {
                url: '/user-webhooks',
                views: {
                  'webhooksViews': {
                    controller: 'UserWebhooksCtrl',
                    templateUrl: 'app/pages/webhooks/userWebhooks/userWebhooks.html'
                  }
                },
                params: {
                    secret: null
                },
                title: "User webhooks"
            });
    }

})();
