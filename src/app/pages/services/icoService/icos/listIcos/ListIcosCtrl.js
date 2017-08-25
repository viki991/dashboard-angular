(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.listIcos')
        .controller('ListIcosCtrl', ListIcosCtrl);

    /** @ngInject */
    function ListIcosCtrl($scope,$http,cookieManagement,errorToasts,$location,toastr,$ngConfirm) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.serviceUrl = cookieManagement.getCookie('SERVICEURL');
        $scope.defaultImageUrl = "/assets/img/app/placeholders/hex_grey.svg";
        $scope.icoSettingView = '';

        vm.getIcosList = function () {
            $scope.loadingIcos =  true;
            if(vm.token) {
                $http.get(vm.serviceUrl + 'admin/icos/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingIcos =  false;
                    if (res.status === 200) {
                        $scope.icosList = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingIcos =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getIcosList();

        $scope.goToAddIcoView = function () {
            $location.path('/services/ico/add');
        };

        $scope.deleteIcoPrompt = function(ico) {
            $ngConfirm({
                title: 'Delete ico',
                contentUrl: 'app/pages/services/icoService/icos/listIcos/deleteIcoPrompt.html',
                animationBounce: 1,
                animationSpeed: 100,
                scope: $scope,
                buttons: {
                    close: {
                        text: "Cancel",
                        btnClass: 'btn-default'
                    },
                    Add: {
                        text: "Delete",
                        btnClass: 'btn-danger',
                        keys: ['enter'], // will trigger when enter is pressed
                        action: function(scope,button){
                            if(scope.proceedText != 'confirm'){
                                toastr.error('Please enter confirm to proceed');
                                return;
                            }
                            scope.deleteIco(ico);
                        }
                    }
                }
            });
        };

        $scope.deleteIco = function (ico) {
            $scope.loadingIcos =  true;
            if(vm.token) {
                $http.delete(vm.serviceUrl + 'admin/icos/' + ico.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        toastr.success('Ico successfully deleted');
                        vm.getIcosList();
                    }
                }).catch(function (error) {
                    $scope.loadingIcos =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.goToIcoView = function (ico) {
            $location.path('/services/ico/' + ico.id);
        };

        $scope.goToEditView = function(ico){
            $location.path('/services/ico/' + ico.id + '/edit');
        };


    }

})();
