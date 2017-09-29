(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('lastTransactions', lastTransactions);

    /** @ngInject */
    function lastTransactions() {
        return {
            restrict: 'E',
            controller: 'LastTransactionsCtrl',
            templateUrl: 'app/pages/users/userDetails/lastTransactions/lastTransactions.html'
        };
    }
})();
