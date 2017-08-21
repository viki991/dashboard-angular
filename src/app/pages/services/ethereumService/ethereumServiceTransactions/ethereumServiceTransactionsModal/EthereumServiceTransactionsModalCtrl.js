(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.ethereumService.ethereumServiceTransactions')
        .controller('EthereumServiceTransactionsModalCtrl', EthereumServiceTransactionsModalCtrl);

    function EthereumServiceTransactionsModalCtrl($uibModalInstance,$scope,transaction,metadataTextService,$state,$location) {
        $scope.metadata = metadataTextService.convertToText(transaction.metadata);
        $scope.transaction = transaction;

        $scope.goToUser = function () {
            $uibModalInstance.close();
            $location.path('/user/' + $scope.transaction.user.identifier);
        };

        $scope.goToTransactions = function(rehiveCode){
            $uibModalInstance.close();
            $state.go('transactions.history',{"transactionId": rehiveCode});
        }
    }
})();
