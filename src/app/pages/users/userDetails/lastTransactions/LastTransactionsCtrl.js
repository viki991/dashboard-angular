(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('LastTransactionsCtrl', LastTransactionsCtrl);

    /** @ngInject */
    function LastTransactionsCtrl($rootScope,$scope,environmentConfig,$stateParams,$http,
                                  cookieManagement,errorHandler,$location,$state,$uibModal) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.loadingLastTransactions = true;
        $scope.transactionsStateMessage = '';
        $scope.userTransactions = [];

        vm.getUserTransactions = function(){

            if ($scope.userTransactions.length > 0) {
                $scope.userTransactions.length = 0;
            }

            if(vm.token) {
                $scope.loadingLastTransactions = true;
                $http.get(environmentConfig.API + '/admin/transactions/?user=' + vm.uuid + '&page_size=10', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingLastTransactions = false;
                    if (res.status === 200) {
                        $scope.userTransactions = res.data.data.results;
                        if ($scope.userTransactions == 0) {
                            $scope.transactionsStateMessage = 'No transactions have been made';
                            return;
                        }

                        $scope.transactionsStateMessage = '';
                    }
                }).catch(function (error) {
                    $scope.loadingLastTransactions = false;
                    $scope.transactionsStateMessage = 'Failed to load data';
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };
        vm.getUserTransactions();

        $scope.openModal = function (page, size,transaction) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'LastTransactionsModalCtrl',
                resolve: {
                    transaction: function () {
                        return transaction;
                    }
                }
            });

            vm.theModal.result.then(function(transaction){
                if(transaction){
                    vm.getUserTransactions();
                }
            }, function(){
            });
        };

    }
})();
