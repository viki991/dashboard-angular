(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks.generalWebhooks')
        .directive('editGeneralWebhook', editGeneralWebhook);

    /** @ngInject */
    function editGeneralWebhook() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/webhooks/generalWebhooks/editGeneralWebhook/editGeneralWebhook.html'
        };
    }
})();
