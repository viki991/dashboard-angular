(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.bitcoinService.bitcoinServiceSettings')
        .controller('BitcoinServiceSettingsCtrl', BitcoinServiceSettingsCtrl);

    /** @ngInject */
    function BitcoinServiceSettingsCtrl($scope) {

        $scope.defaultImageUrl = "/assets/img/app/placeholders/hex_grey.svg";

    }

})();
