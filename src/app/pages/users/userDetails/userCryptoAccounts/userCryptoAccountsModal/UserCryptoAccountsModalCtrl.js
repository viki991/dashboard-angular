(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserCryptoAccountsModalCtrl', UserCryptoAccountsModalCtrl);

    function UserCryptoAccountsModalCtrl($scope,$uibModalInstance,userCryptoAccount,uuid,toastr,$http,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.userCryptoAccount = userCryptoAccount;
        vm.uuid = uuid;
        $scope.deletingUserCryptoAccount = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteUserCryptoAccount = function () {
            $scope.deletingUserCryptoAccount = true;
            $http.delete(environmentConfig.API + '/admin/users/crypto-accounts/' + userCryptoAccount.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingUserCryptoAccount = false;
                if (res.status === 200) {
                    toastr.success('User crypto account successfully deleted');
                    $uibModalInstance.close($scope.userCryptoAccount);
                }
            }).catch(function (error) {
                $scope.deletingUserCryptoAccount = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
