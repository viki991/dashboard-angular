(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.viewIco.rates')
        .controller('RatesCtrl', RatesCtrl);

    /** @ngInject */
    function RatesCtrl($scope,$http,cookieManagement,errorHandler,$location,toastr,$stateParams,$ngConfirm) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.serviceUrl = cookieManagement.getCookie('SERVICEURL');
        $scope.loadingRates = false;

        vm.getIcoRates =  function () {
            $scope.loadingRates = true;
            if(vm.token) {
                $http.get(vm.serviceUrl + 'admin/icos/' + $stateParams.id + '/phases/' + $stateParams.phaseId + '/rates/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingRates =  false;
                    if (res.status === 200) {
                        $scope.icoRates = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingRates =  false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };
        vm.getIcoRates();

        $scope.backToPhaseList = function(){
            $location.path('/services/ico/' + $stateParams.id + '/phase/list');
        }


    }
})();
