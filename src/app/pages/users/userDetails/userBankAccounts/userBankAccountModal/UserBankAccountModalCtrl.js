(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserBankAccountModalCtrl', UserBankAccountModalCtrl);

    function UserBankAccountModalCtrl($scope,$uibModalInstance,bankAccount,toastr,$http,environmentConfig,cookieManagement,errorToasts) {

        var vm = this;

        $scope.userBankAccount = bankAccount;
        $scope.deletingUserBankAccount = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteUserBankAccount = function () {
            $scope.deletingUserBankAccount = true;
            $http.delete(environmentConfig.API + '/admin/users/bank-accounts/' + $scope.userBankAccount.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingUserBankAccount = false;
                if (res.status === 200) {
                    toastr.success('User bank account successfully deleted');
                    $uibModalInstance.close($scope.userBankAccount);
                }
            }).catch(function (error) {
                $scope.deletingUserBankAccount = false;
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
