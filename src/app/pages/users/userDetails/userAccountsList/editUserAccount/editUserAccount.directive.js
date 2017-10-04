(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('editUserAccount', editUserAccount);

    /** @ngInject */
    function editUserAccount() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/users/userDetails/userAccountsList/editUserAccount/editUserAccount.html'
        };
    }
})();
