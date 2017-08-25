(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.editIco')
        .controller('EditIcoCtrl', EditIcoCtrl);

    /** @ngInject */
    function EditIcoCtrl($scope,$http,cookieManagement,errorToasts,$location,toastr,$stateParams) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.serviceUrl = cookieManagement.getCookie('SERVICEURL');
        $scope.editIcoObj = {};
        $scope.editingIco = false;

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
                enabled: $scope.editIcoObj.enabled
            };

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
