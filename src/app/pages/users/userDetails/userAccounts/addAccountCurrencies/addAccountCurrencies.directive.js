(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('addAccountCurrencies', addAccountCurrencies);

    /** @ngInject */
    function addAccountCurrencies() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/userAccounts/addAccountCurrencies/addAccountCurrencies.html'
        };
    }
})();
