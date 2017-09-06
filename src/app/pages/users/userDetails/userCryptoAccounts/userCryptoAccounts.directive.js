(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('userCryptoAccounts', userCryptoAccounts);

    /** @ngInject */
    function userCryptoAccounts() {
        return {
            restrict: 'E',
            controller: 'UserCryptoAccountsCtrl',
            templateUrl: 'app/pages/users/userDetails/userCryptoAccounts/userCryptoAccounts.html'
        };
    }
})();
