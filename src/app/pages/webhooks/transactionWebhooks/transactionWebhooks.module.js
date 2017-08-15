(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks.transactionWebhooks', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('webhooks.transactionWebhooks', {
                url: '/transaction',
                templateUrl: 'app/pages/webhooks/transactionWebhooks/transactionWebhooks.html',
                controller: 'TransactionWebhooksCtrl',
                params: {
                    secret: null
                },
                title: "Transaction webhooks",
                sidebarMeta: {
                    order: 200
                }
            });
    }

})();
