(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('lastTransactionsTable', lastTransactionsTable);

    /** @ngInject */
    function lastTransactionsTable() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/lastTransactions/lastTransactionsTable/lastTransactionsTable.html'
        };
    }
})();
