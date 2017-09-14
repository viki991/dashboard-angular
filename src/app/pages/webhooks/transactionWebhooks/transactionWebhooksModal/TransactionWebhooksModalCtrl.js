(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks.transactionWebhooks')
        .controller('TransactionWebhooksModalCtrl', TransactionWebhooksModalCtrl);

    function TransactionWebhooksModalCtrl($scope,$uibModalInstance,transactionWebhook,toastr,$http,environmentConfig,cookieManagement,errorToasts) {

        var vm = this;

        $scope.transactionWebhook = transactionWebhook;
        $scope.deletingTransactionWebhook = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteTransactionWebhook = function () {
            $scope.deletingTransactionWebhook = true;
            $http.delete(environmentConfig.API + '/admin/webhooks/transactions/' + $scope.transactionWebhook.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingTransactionWebhook = false;
                if (res.status === 200) {
                    toastr.success('Transaction Webhook successfully deleted');
                    $uibModalInstance.close($scope.transactionWebhook);
                }
            }).catch(function (error) {
                $scope.deletingTransactionWebhook = false;
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
