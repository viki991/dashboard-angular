
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.withdrawals')
        .directive('confirmWithdrawal', confirmWithdrawal);

    /** @ngInject */
    function confirmWithdrawal() {
        return {
            restrict: 'E',
            controller: 'WithdrawalsCtrl',
            templateUrl: 'app/pages/transactions/withdrawals/confirmWithdrawal/confirmWithdrawal.html'
        };
    }
})();