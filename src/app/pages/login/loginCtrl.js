(function () {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification,$timeout) {

        var vm = this;
        cookieManagement.deleteCookie('TOKEN');
        $scope.gotCompanyName = false;
        $scope.path = $location.path();

        $scope.login = function(user, company, password) {
            $rootScope.$pageFinishedLoading = false;

            $http.post(environmentConfig.API + '/auth/login/', {
                user: user,
                company: company,
                password: password
            }).then(function (res) {
                if (res.status === 200) {
                    cookieManagement.setCookie('TOKEN','Token ' + res.data.data.token);
                    vm.checkMultiFactorAuthEnabled(res.data.data.token);

                }
            }).catch(function (error) {
                $scope.gotCompanyName = false;
                $rootScope.$pageFinishedLoading = true;
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.checkMultiFactorAuthEnabled = function (token) {
            if(token) {
                $http.get(environmentConfig.API + '/auth/mfa/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        var enabledObj = vm.checkMultiFactorAuthEnabledFromData(res.data.data);
                        if(enabledObj.enabled){
                            $rootScope.$pageFinishedLoading = true;
                            $location.path('/authentication/multi-factor/verify/' + enabledObj.key).search({prevUrl: 'login'});
                        } else {
                            vm.checkUserVerification(token);
                        }

                    }
                }).catch(function (error) {
                    $rootScope.$pageFinishedLoading = true;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.checkMultiFactorAuthEnabledFromData = function(multiFactorAuthObj){
            var enabledObj = {enabled: false,key: ''};
            for (var key in multiFactorAuthObj) {
                if (multiFactorAuthObj.hasOwnProperty(key)) {
                    if(multiFactorAuthObj[key] == true){
                        enabledObj.enabled = true;
                        enabledObj.key = key;
                        break;
                    }
                }
            }
            return enabledObj;
        };

        vm.checkUserVerification = function (token) {
            userVerification.verify(function(err,verified){
                if(verified){
                    $rootScope.userVerified = true;
                    vm.getCompanyInfo(token);
                } else {
                    $rootScope.$pageFinishedLoading = true;
                    $rootScope.userVerified = false;
                    $location.path('/verification');
                }
            });
        };

        vm.getCompanyInfo = function (token) {
            if(token) {
                $http.get(environmentConfig.API + '/admin/company/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token
                    }
                }).then(function (res) {
                    if(res.data.data && res.data.data.name){
                        $rootScope.companyName = res.data.data.name;
                        $rootScope.haveCompanyName = true;
                        vm.getCompanyCurrencies(token);
                    } else {
                        $rootScope.$pageFinishedLoading = true;
                        $location.path('/company/name_request');
                    }
                }).catch(function (error) {
                    $rootScope.$pageFinishedLoading = true;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.getCompanyCurrencies = function(token){
            if(token){
                $http.get(environmentConfig.API + '/admin/currencies/?enabled=true', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        if(res.data.data.results.length == 0){
                            $location.path('currency/add/initial');
                        } else {
                            $rootScope.intialCurrency = true;
                            $location.path('/home');
                        }
                        $rootScope.$pageFinishedLoading = true;
                    }
                }).catch(function (error) {
                    $rootScope.$pageFinishedLoading = true;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
    }
})();
