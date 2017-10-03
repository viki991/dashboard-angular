(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.overview')
        .controller('OverviewCtrl', OverviewCtrl);

    /** @ngInject */
    function OverviewCtrl($scope,$location,$stateParams,cookieManagement,environmentConfig,$http,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.currencyCode = $stateParams.currencyCode;
        $scope.loadingCurrencies = true;

        vm.getCurrencyOverview = function () {
            if(vm.token) {
                $scope.loadingCurrencies = true;
                $http.get(environmentConfig.API + '/admin/currencies/' + $scope.currencyCode + '/overview/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.currencyOverviewData = res.data.data;
                        $scope.loadingCurrencies = false;
                    }
                }).catch(function (error) {
                    $scope.loadingCurrencies = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };
        vm.getCurrencyOverview();

        $scope.goToPath = function (path) {
          $location.path(path);
        };


    }
})();