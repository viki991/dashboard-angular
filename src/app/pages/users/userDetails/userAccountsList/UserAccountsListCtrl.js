(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserAccountsListCtrl', UserAccountsListCtrl);

    /** @ngInject */
    function UserAccountsListCtrl($scope,environmentConfig,$stateParams,toastr,
                              $http,cookieManagement,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        vm.reference = '';
        $scope.newUserAccountParams = {};
        $scope.newAccountCurrencies = {list: []};
        $scope.loadingUserAccountsList = true;
        $scope.addingAccount = false;

        vm.getUser = function(){
            if(vm.token) {
                $scope.loadingUserAccountsList = true;
                $http.get(environmentConfig.API + '/admin/accounts/?user=' + vm.uuid, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserAccountsList = false;
                    if (res.status === 200) {
                        $scope.accounts = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingUserAccountsList = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };
        vm.getUser();

        $scope.addNewUserAccount = function(newUserAccountParams){

            if(vm.token) {
                newUserAccountParams.user = vm.uuid;
                $scope.loadingUserAccountsList = true;
                $http.post(environmentConfig.API + '/admin/accounts/', newUserAccountParams, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 201) {
                        $scope.newUserAccountParams = {};
                        $scope.toggleAddAccount();
                        toastr.success('User account successfully added');
                        vm.getUser();
                    }
                }).catch(function (error) {
                    $scope.loadingUserAccountsList = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        $scope.toggleAddAccount = function () {
            $scope.addingAccount = !$scope.addingAccount;
        };

    }
})();
