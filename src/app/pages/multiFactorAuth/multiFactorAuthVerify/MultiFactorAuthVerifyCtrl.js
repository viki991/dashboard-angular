(function () {
    'use strict';

    angular.module('BlurAdmin.pages.multiFactorAuthVerify')
        .controller('MultiFactorAuthVerifyCtrl', MultiFactorAuthVerifyCtrl);

    /** @ngInject */
    function MultiFactorAuthVerifyCtrl($scope,$http,environmentConfig,cookieManagement,errorToasts,toastr,$stateParams,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.authType = $stateParams.authType;
        $scope.verifyTokenObj = {token: ''};
        $scope.tokenAuthenticationEnabled = false;

        vm.getTokenAuthenticationDetails = function(){
            if(vm.token) {
                $scope.loadingVerifyAuth = true;
                $http.post(environmentConfig.API + '/auth/mfa/token/',{}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if(res.status === 201) {
                        $scope.tokenAuthenticationDetails = res.data.data;
                        $scope.qrCodeUrl = 'https://chart.googleapis.com/chart?cht=qr&chl='+ res.data.data.otpauth_url
                            + '&chs=200x200&chld=L|0';
                        delete $scope.tokenAuthenticationDetails['otpauth_url'];
                        $scope.loadingVerifyAuth = false;
                    }
                }).catch(function (error) {
                    $scope.loadingVerifyAuth = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        if($scope.authType == 'token'){
            vm.getTokenAuthenticationDetails();
        }

        vm.checkIfTokenAuthenticationEnabled = function(){
            if(vm.token) {
                $scope.loadingVerifyAuth = true;
                $http.get(environmentConfig.API + '/auth/mfa/token/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if(res.status === 200) {
                        if(res.data.data && res.data.data.confirmed){
                            $scope.tokenAuthenticationEnabled = true;
                        }

                        $scope.loadingVerifyAuth = false;
                    }
                }).catch(function (error) {
                    $scope.loadingVerifyAuth = false;
                });
            }
        };
        vm.checkIfTokenAuthenticationEnabled();

        $scope.deleteTokenAuth = function(){
            if(vm.token) {
                $scope.loadingVerifyAuth = true;
                $http.delete(environmentConfig.API + '/auth/mfa/token/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if(res.status === 200) {
                        toastr.success('Token authentication successfully disabled');
                        $location.path('/authentication/multi-factor');
                        $scope.loadingVerifyAuth = false;
                    }
                }).catch(function (error) {
                    $scope.loadingVerifyAuth = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.resendSmsAuthNumber = function(){
            if(vm.token) {
                $scope.loadingVerifyAuth = true;
                $http.post(environmentConfig.API + '/auth/mfa/sms/send/',{}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        toastr.success('Otp has been resent to your mobile number successfully');
                        $scope.loadingVerifyAuth = false;
                    }
                }).catch(function (error) {
                    $scope.loadingVerifyAuth = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.verifyToken = function(){
            if(vm.token) {
                $scope.loadingVerifyAuth = true;
                $http.post(environmentConfig.API + '/auth/mfa/verify/',$scope.verifyTokenObj, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if(res.status === 201) {
                        toastr.success('Token successfully verified');
                        $location.path('/settings/security');
                        $scope.loadingVerifyAuth = false;
                    }
                }).catch(function (error) {
                    $scope.loadingVerifyAuth = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };


    }
})();
