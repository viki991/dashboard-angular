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
        $scope.searchPurchasesParams = {
            searchId: '',
            searchQuoteId: '',
            searchCurrency: {code: 'Currency'}
        };
        $scope.currencyOptions = [];

        $scope.pagination = {
            itemsPerPage: 10,
            pageNo: 1,
            maxSize: 5
        };

        $scope.getCurrenciesList = function () {
            if(vm.token) {
                $http.get(vm.serviceUrl + 'admin/currencies/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.currencyOptions = res.data.data.results;
                        $scope.currencyOptions.splice(0,0,{code: 'Currency'});
                    }
                }).catch(function (error) {
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        $scope.getCurrenciesList();

        vm.getIco =  function () {
            if(vm.token) {
                $http.get(vm.serviceUrl + 'admin/icos/' + $stateParams.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.icoObj = res.data.data;
                    }
                }).catch(function (error) {
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getIco();

        vm.getPurchasesListUrl = function(){
            vm.filterParams = '?page=' + $scope.pagination.pageNo + '&page_size=' + $scope.pagination.itemsPerPage
                +  '&id=' + ($scope.searchPurchasesParams.searchId ? $scope.searchPurchasesParams.searchId : '')
                +  '&quote__id=' + ($scope.searchPurchasesParams.searchQuoteId ? $scope.searchPurchasesParams.searchQuoteId : '')
                +  '&quote__deposit_currency__code=' + ($scope.searchPurchasesParams.searchCurrency.code == 'Currency' ?
                    '' : $scope.searchPurchasesParams.searchCurrency.code);

            return vm.serviceUrl + 'admin/icos/' + $stateParams.id + '/purchases/' + vm.filterParams;
        };

        $scope.getIcoPurchases =  function (applyFilter) {
            $scope.loadingPurchases = true;

            $scope.icoPurchases = [];

            if (applyFilter) {
                // if function is called from filters directive, then pageNo set to 1
                $scope.pagination.pageNo = 1;
            }

            if ($scope.icoPurchases.length > 0) {
                $scope.icoPurchases.length = 0;
            }

            var purchasesListUrl = vm.getPurchasesListUrl();

            if(vm.token) {
                $http.get(purchasesListUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingPurchases =  false;
                    if (res.status === 200) {
                        $scope.icoPurchasesData = res.data.data;
                        $scope.icoPurchases = res.data.data.results;
                        console.log($scope.icoPurchases)
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
