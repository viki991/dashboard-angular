(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('PageTopCtrl', PageTopCtrl);

    /** @ngInject */
    function PageTopCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorHandler,$window,_) {
        var vm = this;

        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.currencies = [];
        vm.currentLocation = $location.path();
        $rootScope.$on('$locationChangeStart', function (event,newUrl) {
            var newUrlArray = newUrl.split('/'),
                newUrlLastElement = _.last(newUrlArray);
            vm.currentLocation = newUrlLastElement;
        });

        vm.getCompanyInfo = function () {
            if(vm.token) {
                $scope.loadingCompanyInfo = true;
                $http.get(environmentConfig.API + '/admin/company/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingCompanyInfo = false;
                    if (res.status === 200) {
                        $scope.company = res.data.data;
                        vm.getCompanyCurrencies();
                    }
                }).catch(function (error) {
                    $scope.loadingCompanyInfo = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        if(vm.currentLocation != '/login' && vm.currentLocation != '/verification' &&
            vm.currentLocation != '/company/name_request' && vm.currentLocation != '/register' &&
            vm.currentLocation != '/password/reset' && vm.currentLocation != '/authentication/multi-factor/verify/sms' &&
            vm.currentLocation != '/authentication/multi-factor/verify/token'
        ){
            vm.getCompanyInfo();
        }


        vm.getCompanyCurrencies = function(){
            if(vm.token){
                $http.get(environmentConfig.API + '/admin/currencies/?enabled=true', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        // if(!$rootScope.selectedCurrency){
                        //     var selectedCurrencyObj;
                        //     selectedCurrencyObj = res.data.data.results.find(function(element){
                        //         return element.code == $scope.company.default_currency;
                        //     });
                        //     $rootScope.selectedCurrency = selectedCurrencyObj || res.data.data.results[0];
                        // }
                        // $scope.currencies = res.data.data.results;
                        $window.sessionStorage.currenciesList = JSON.stringify(res.data.data.results);
                    }
                }).catch(function (error) {
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        // $scope.selectCurrency = function(selectedCurrency){
        //     $rootScope.selectedCurrency = selectedCurrency;
        // };

        $scope.logout = function(){
            //$rootScope.selectedCurrency = null;
            $rootScope.gotToken = false;
            $rootScope.securityConfigured = true;
            $rootScope.companyName = null;
            $rootScope.haveCompanyName = false;
            cookieManagement.deleteCookie('TOKEN');
            $location.path('/login');
        };
    }

})();
