(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verification')
        .controller('VerificationCtrl', VerificationCtrl);

    /** @ngInject */
    function VerificationCtrl($rootScope,$scope,$http,toastr,cookieManagement,environmentConfig,$location,errorHandler,userVerification,_) {

        var vm = this;
        vm.user = {};
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.verifyingEmail = false;
        $rootScope.$pageFinishedLoading = false;

        vm.checkIfUserVerified = function(){
            userVerification.verify(function(err,verified){
                if(verified){
                    $rootScope.userVerified = true;
                    $location.path('/company/name_request');
                    $rootScope.$pageFinishedLoading = true;
                } else {
                    $rootScope.$pageFinishedLoading = true;
                }
            });
        };
        vm.checkIfUserVerified();

        $scope.verifyUser = function(){
            $scope.verifyingEmail = true;
            userVerification.verify(function(err,verified){
                if(verified){
                    $scope.verifyingEmail = false;
                    $rootScope.userVerified = true;
                    $location.path('/company/name_request');
                } else {
                    $scope.verifyingEmail = false;
                    toastr.error('Please verify your account','Message');
                }
            });
        };

        vm.getUserInfo = function(){
            $http.get(environmentConfig.API + '/user/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    vm.user = res.data.data;
                }
            }).catch(function (error) {
                errorHandler.evaluateErrors(error.data);
                errorHandler.handleErrors(error);
            });
        };
        vm.getUserInfo();

        $scope.resendEmail = function(){
            $http.post(environmentConfig.API + '/auth/email/verify/resend/',{email: vm.user.email,company: vm.user.company}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    toastr.success('Verification email has been re-sent');
                }
            }).catch(function (error) {
                errorHandler.evaluateErrors(error.data);
                errorHandler.handleErrors(error);
            });
        };


    }
})();
