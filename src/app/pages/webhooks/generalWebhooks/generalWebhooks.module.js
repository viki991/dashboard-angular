(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks.generalWebhooks', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('webhooks.generalWebhooks', {
                url: '/general',
                views: {
                    'webhooksSettingsView': {
                        templateUrl: 'app/pages/webhooks/generalWebhooks/generalWebhooks.html',
                        controller: 'GeneralWebhooksCtrl'
                    }
                },
                params: {
                    secret: null
                },
                title: "General webhooks"
            });
    }

})();
