(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('lastTransactionsFilters', lastTransactionsFilters);

    /** @ngInject */
    function lastTransactionsFilters() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/lastTransactions/lastTransactionsFilters/lastTransactionsFilters.html'
        };
    }
})();
