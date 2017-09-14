(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.overview')
        .controller('OverviewCtrl', OverviewCtrl);

    /** @ngInject */
    function OverviewCtrl($rootScope,$scope,$location,cookieManagement,environmentConfig,$http,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingCurrencies = true;

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                vm.token = cookieManagement.getCookie('TOKEN');
                vm.getCurrencyOverview();
                vm.getCurrencyOverviewUsersData();
            }
        });

        vm.getCurrencyOverview = function () {
            if(vm.token) {
                $scope.loadingCurrencies = true;
                $http.get(environmentConfig.API + '/admin/currencies/' + $rootScope.selectedCurrency.code + '/overview/', {
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
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.getCurrencyOverviewUsersData = function () {
            if(vm.token) {
                $scope.loadingCurrencies = true;
                $http.get(environmentConfig.API + '/admin/users/overview/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.currencyOverviewUsersData = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingCurrencies = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.goToPath = function (path) {
          $location.path(path);
        };


    }
})();