(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.ethereumService')
        .controller('EthereumServiceCtrl', EthereumServiceCtrl);

    /** @ngInject */
    function EthereumServiceCtrl($scope) {

        $scope.defaultImageUrl = "https://www.firstchoicetiles.ie/custom/public/images/30b-hexagon-grey-m.jpg";

    }

})();
