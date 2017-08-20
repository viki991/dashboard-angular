(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.ethereumService.ethereumServiceSettings')
        .controller('EthereumServiceSettingsCtrl', EthereumServiceSettingsCtrl);

    /** @ngInject */
    function EthereumServiceSettingsCtrl($scope) {

        $scope.defaultImageUrl = "https://clariturehealth.com/wp-content/uploads/2016/09/Hexagon-Gray.png";

    }

})();
