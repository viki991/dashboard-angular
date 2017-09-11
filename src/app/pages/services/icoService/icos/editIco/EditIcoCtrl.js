(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.editIco')
        .controller('EditIcoCtrl', EditIcoCtrl);

    /** @ngInject */
    function EditIcoCtrl($scope,$http,cookieManagement,errorToasts,$location,toastr,$stateParams,$filter) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.serviceUrl = cookieManagement.getCookie('SERVICEURL');
        $scope.editIcoObj = {};
        $scope.editingIco = false;

        $scope.$watch('editIcoObj.min_purchase_amount', function() {
            $scope.editIcoObj.min_purchase_amount = $filter('preciseRound',$filter('currencyModifiersFilter',$scope.editIcoObj.min_purchase_amount));
        });

        $scope.$watch('editIcoObj.max_purchase_amount', function() {
            $scope.editIcoObj.max_purchase_amount = $filter('preciseRound',$filter('currencyModifiersFilter',$scope.editIcoObj.max_purchase_amount));
        });

        vm.getIco =  function () {
            $scope.editingIco = true;
            if(vm.token) {
                $http.get(vm.serviceUrl + 'admin/icos/' + $stateParams.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.editingIco =  false;
                    if (res.status === 200) {
                        $scope.editIcoObj = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.editingIco =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getIco();

        $scope.editIco = function () {

            var editIcoObj = {
                exchange_provider: $scope.editIcoObj.exchange_provider,
                min_purchase_amount: '',
                max_purchase_amount: '',
                max_purchases: $scope.editIcoObj.max_purchases,
                enabled: $scope.editIcoObj.enabled,
                public: $scope.editIcoObj.public
            };

            if($scope.editIcoObj.min_purchase_amount){
                if(currencyModifiers.validateCurrency($scope.editIcoObj.min_purchase_amount,$scope.editIcoObj.currency.divisibility)){
                    editIcoObj.min_purchase_amount = parseInt(currencyModifiers.convertToCents($scope.editIcoObj.min_purchase_amount,$scope.editIcoObj.currency.divisibility));
                } else {
                    toastr.error('Please input min purchase amount to ' + $scope.editIcoObj.currency.divisibility + ' decimal places');
                    return;
                }
            }

            if($scope.editIcoObj.max_purchase_amount){
                if(currencyModifiers.validateCurrency($scope.editIcoObj.max_purchase_amount,$scope.editIcoObj.currency.divisibility)){
                    editIcoObj.max_purchase_amount = parseInt(currencyModifiers.convertToCents($scope.editIcoObj.max_purchase_amount,$scope.editIcoObj.currency.divisibility));
                } else {
                    toastr.error('Please input max purchase amount to ' + $scope.editIcoObj.currency.divisibility + ' decimal places');
                    return;
                }
            }

            if(vm.token) {
                $http.patch(vm.serviceUrl + 'admin/icos/' + $scope.editIcoObj.id + '/',editIcoObj, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.editingIco =  false;
                    if (res.status === 200) {
                        toastr.success('Ico updated successfully');
                        $location.path('/services/ico/list');
                    }
                }).catch(function (error) {
                    $scope.editingIco =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.goToIcoListView = function () {
            $location.path('services/ico/list');
        }


    }
})();
