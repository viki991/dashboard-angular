(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService.stellarServiceSettings')
        .controller('StellarServiceSettingsCtrl', StellarServiceSettingsCtrl);

    /** @ngInject */
    function StellarServiceSettingsCtrl($scope) {

        $scope.defaultImageUrl = "https://clariturehealth.com/wp-content/uploads/2016/09/Hexagon-Gray.png";

    }

})();
