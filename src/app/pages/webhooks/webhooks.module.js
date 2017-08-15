(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks', [
        'BlurAdmin.pages.webhooks.transactionWebhooks',
        'BlurAdmin.pages.webhooks.userWebhooks'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('webhooks', {
                url: '/webhooks',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Webhooks',
                sidebarMeta: {
                    order: 400
                }
            });
    }

})();