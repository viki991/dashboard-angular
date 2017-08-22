(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService')
        .controller('StellarServiceCtrl', StellarServiceCtrl);

    /** @ngInject */
    function StellarServiceCtrl($scope) {

        $scope.defaultImageUrl = "/assets/img/app/placeholders/hex_grey.svg";

    }

})();
