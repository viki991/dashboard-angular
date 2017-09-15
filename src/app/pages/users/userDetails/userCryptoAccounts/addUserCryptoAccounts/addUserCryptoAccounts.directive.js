(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('addUserCryptoAccounts', addUserCryptoAccounts);

    /** @ngInject */
    function addUserCryptoAccounts() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/userCryptoAccounts/addUserCryptoAccounts/addUserCryptoAccounts.html'
        };
    }
})();
