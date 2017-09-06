(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks', [
        'BlurAdmin.pages.webhooks.transactionWebhooks',
        'BlurAdmin.pages.webhooks.generalWebhooks'
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('webhooks', {
                url: '/webhooks',
                templateUrl: 'app/pages/webhooks/webhooks.html',
                controller: "WebhooksCtrl",
                title: 'Webhooks',
                sidebarMeta: {
                    order: 400
                }
            });
    }

})();