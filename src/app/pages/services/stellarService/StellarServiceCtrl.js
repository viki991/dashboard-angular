(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService')
        .controller('StellarServiceCtrl', StellarServiceCtrl);

    /** @ngInject */
    function StellarServiceCtrl($scope) {

        $scope.defaultImageUrl = "https://clariturehealth.com/wp-content/uploads/2016/09/Hexagon-Gray.png";

    }

})();
