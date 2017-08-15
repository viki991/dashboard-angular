(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks.transactionWebhooks', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('webhooks.transactionWebhooks', {
                url: '/transaction-webhooks',
                views: {
                  'webhooksViews': {
                    controller: 'TransactionWebhooksCtrl',
                    templateUrl: 'app/pages/webhooks/transactionWebhooks/transactionWebhooks.html'
                  }
                },
                params: {
                    secret: null
                },
                title: "Transaction webhooks"
            });
    }

})();
