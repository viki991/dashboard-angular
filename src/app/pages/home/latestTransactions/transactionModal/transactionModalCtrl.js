(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('transactionModalCtrl', transactionModalCtrl);

    /** @ngInject */
    function transactionModalCtrl($uibModalInstance,toastr,$scope,transaction,environmentConfig,
                                  cookieManagement,errorHandler,errorToasts,$http,metadataTextService,$location) {

        var vm = this;
        $scope.transaction = transaction;
        $scope.updateTransactionObj = {};
        $scope.formatted = {};
        $scope.formatted.metadata = metadataTextService.convertToText($scope.transaction.metadata);
        $scope.editingTransaction = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.editTransaction = function(){
            var metaData;
            if($scope.updateTransactionObj.metadata){
                if(vm.isJson($scope.updateTransactionObj.metadata)){
                    metaData =  JSON.parse($scope.updateTransactionObj.metadata);
                } else {
                    toastr.error('Incorrect format');
                    return false;
                }
            } else {
                metaData = " ";
            }

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
                        if(metaData == " "){
                            delete $scope.formatted.metadata;
                            delete $scope.transaction.metadata
                        } else {
                            $scope.transaction.metadata = metaData;
                            $scope.formatted.metadata = metadataTextService.convertToText(metaData);
                        }

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

        vm.isJson = function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        };

        $scope.toggleEditingTransaction = function () {
            if(!$scope.editingTransaction){
                if($scope.formatted.metadata){
                    $scope.updateTransactionObj.metadata = JSON.stringify($scope.transaction.metadata);
                } else {
                    $scope.updateTransactionObj.metadata = '';
                }
            } else {
                delete $scope.updateTransactionObj.metadata;
            }

            $scope.editingTransaction = !$scope.editingTransaction;
        };

        $scope.goToUser = function () {
            $uibModalInstance.close();
            $location.path('/user/' + $scope.transaction.user.identifier);
        }
    }

})();