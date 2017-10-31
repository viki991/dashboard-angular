(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.security')
        .controller('ShowTokenModalCtrl', ShowTokenModalCtrl);

    function ShowTokenModalCtrl($scope,token,toastr) {
        $scope.token = token;

        $scope.copiedSuccessfully= function () {
            toastr.success('Token copied successfully');
        };

    }
})();
