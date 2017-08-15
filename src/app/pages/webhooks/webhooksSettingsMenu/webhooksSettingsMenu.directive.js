(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks')
        .directive('webhooksSettingsMenu', webhooksSettingsMenu);

    /** @ngInject */
    function webhooksSettingsMenu() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/webhooks/webhooksSettingsMenu/webhooksSettingsMenu.html'
        };
    }
})();
