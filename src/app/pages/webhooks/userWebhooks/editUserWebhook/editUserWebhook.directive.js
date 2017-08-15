(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks.userWebhooks')
        .directive('editUserWebhook', editUserWebhook);

    /** @ngInject */
    function editUserWebhook() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/webhooks/userWebhooks/editUserWebhook/editUserWebhook.html'
        };
    }
})();
