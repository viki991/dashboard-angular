(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.bitcoinService')
        .controller('BitcoinServiceCtrl', BitcoinServiceCtrl);

    /** @ngInject */
    function BitcoinServiceCtrl($scope) {

        $scope.defaultImageUrl = "https://www.firstchoicetiles.ie/custom/public/images/30b-hexagon-grey-m.jpg";

    }

})();
