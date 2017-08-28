(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.viewIco.purchases')
        .controller('PurchasesCtrl', PurchasesCtrl);

    /** @ngInject */
    function PurchasesCtrl($scope,$http,cookieManagement,errorToasts,$location,toastr,$uibModal,$stateParams) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.serviceUrl = cookieManagement.getCookie('SERVICEURL');
        $scope.loadingPurchases = false;

        vm.getIco =  function () {
            $scope.creatingPhase = true;
            if(vm.token) {
                $http.get(vm.serviceUrl + 'admin/icos/' + $stateParams.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.creatingPhase =  false;
                    if (res.status === 200) {
                        $scope.icoObj = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.creatingPhase =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getIco();

        $scope.getIcoPurchases =  function () {
            $scope.loadingPurchases = true;
            if(vm.token) {
                $http.get(vm.serviceUrl + 'admin/icos/' + $stateParams.id + '/purchases/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingPurchases =  false;
                    if (res.status === 200) {
                        $scope.icoPurchases = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingPurchases =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        $scope.getIcoPurchases();

        $scope.openPurchasesModal = function (page, size,purchase) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'PurchasesModalCtrl',
                resolve: {
                    purchase: function () {
                        return purchase;
                    },
                    icoObj: function () {
                        return $scope.icoObj;
                    }
                }
            });

        };

    }
})();
