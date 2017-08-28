(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.viewIco.quotes')
        .controller('QuotesCtrl', QuotesCtrl);

    /** @ngInject */
    function QuotesCtrl($scope,$http,cookieManagement,errorToasts,$location,toastr,$uibModal,$stateParams) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.serviceUrl = cookieManagement.getCookie('SERVICEURL');
        $scope.loadingQuotes = false;

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

        vm.getIcoRates =  function () {
            $scope.loadingQuotes = true;
            if(vm.token) {
                $http.get(vm.serviceUrl + 'admin/icos/' + $stateParams.id + '/quotes/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingQuotes =  false;
                    if (res.status === 200) {
                        $scope.icoQuotes = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingQuotes =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getIcoRates();

        $scope.openQuotesModal = function (page, size,quote) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'QuotesModalCtrl',
                resolve: {
                    quote: function () {
                        return quote;
                    },
                    icoObj: function () {
                        return $scope.icoObj;
                    }
                }
            });

        };

    }
})();
