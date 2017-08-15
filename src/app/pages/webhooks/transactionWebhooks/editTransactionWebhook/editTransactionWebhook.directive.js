(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks.transactionWebhooks')
        .directive('editTransactionWebhook', editTransactionWebhook);

    /** @ngInject */
    function editTransactionWebhook() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/webhooks/transactionWebhooks/editTransactionWebhook/editTransactionWebhook.html'
        };
    }
})();
