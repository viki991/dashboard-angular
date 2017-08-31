(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('transactionModalCtrl', transactionModalCtrl);

    /** @ngInject */
    function transactionModalCtrl($uibModalInstance,toastr,$scope,transaction,environmentConfig,
                                  cookieManagement,errorHandler,errorToasts,$http,metadataTextService,$location) {

        var vm = this;
        $scope.transaction = transaction;
        $scope.formatted = {};
        $scope.formatted.metadata = metadataTextService.convertToText(transaction.metadata);
        $scope.editingTransaction = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.editTransaction = function(){
            try {
                JSON.parse($scope.transaction.metadata);
            } catch (e) {
                toastr.error("Incorrect format");
                return false;
            }
            var metaData = JSON.parse($scope.transaction.metadata);
            if(vm.token) {
                $http.patch(environmentConfig.API + '/admin/transactions/' + $scope.transaction.id + '/',
                    {
                        metadata: metaData
                    }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.formatted.metadata = metadataTextService.convertToText($scope.transaction.metadata);
                        $scope.toggleEditingTransaction();
                        toastr.success('Transaction successfully updated');
                    }
                }).catch(function (error) {
                    $uibModalInstance.close();
                    if(error.status == 403){
                        errorHandler.handle403();
                        return
                    }
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        // $scope.toggleEditingTransaction = function () {
        //     if(!$scope.editingTransaction){
        //         if(JSON.stringify($scope.transaction.metadata) == '{}' || (typeof $scope.transaction.metadata == "string")){
        //             $scope.transaction.metadata = "";
        //         } else {
        //             $scope.transaction.metadata = JSON.stringify($scope.formatted.metadata);
        //         }
        //     } else {
        //         if($scope.transaction.metadata == ''){
        //             $scope.transaction.metadata = {};
        //         }
        //
        //         try {
        //             JSON.parse($scope.transaction.metadata);
        //         } catch (e) {
        //             $scope.transaction.metadata = {};
        //             $scope.editingTransaction = !$scope.editingTransaction;
        //             return false;
        //         }
        //         $scope.transaction.metadata = JSON.parse($scope.transaction.metadata);
        //     }
        //
        //     $scope.editingTransaction = !$scope.editingTransaction;
        // };

        $scope.goToUser = function () {
            $uibModalInstance.close();
            $location.path('/user/' + $scope.transaction.user.identifier);
        }
    }

})();