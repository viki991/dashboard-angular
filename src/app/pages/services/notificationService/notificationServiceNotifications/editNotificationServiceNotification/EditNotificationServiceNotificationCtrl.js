(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.editNotificationServiceNotification')
        .controller('EditNotificationServiceNotificationCtrl', EditNotificationServiceNotificationCtrl);

    /** @ngInject */
    function EditNotificationServiceNotificationCtrl($scope,$http,cookieManagement,$uibModal,errorHandler,$location,$stateParams,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.baseUrl = cookieManagement.getCookie('SERVICEURL');
        vm.updatedNotification = {};
        $scope.loadingNotifications =  false;

        $scope.boolOptions = ['True','False'];

        vm.getSingleNotification = function () {
            $scope.loadingNotifications =  true;
            if(vm.token) {
                $http.get(vm.baseUrl + 'admin/notifications/' + $stateParams.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingNotifications =  false;
                    if (res.status === 200) {
                        $scope.editNotification = res.data.data;
                        $scope.editNotification.enabled = $scope.editNotification.enabled == true ? 'True' : 'False';
                    }
                }).catch(function (error) {
                    $scope.loadingNotifications =  false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };
        vm.getSingleNotification();

        $scope.goToNotificationListView = function () {
            $location.path('/services/notifications/list');
        };


        $scope.notificationChanged = function (field) {
            vm.updatedNotification[field] = $scope.editNotification[field];
        };

        $scope.updateNotification = function () {
            $scope.loadingNotifications =  true;
            if(vm.updatedNotification.enabled){
                vm.updatedNotification.enabled = vm.updatedNotification.enabled == 'True' ? true : false;
            }

            if(vm.token) {
                $http.patch(vm.baseUrl + 'admin/notifications/' + $scope.editNotification.id + '/',vm.updatedNotification, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        toastr.success('Notification updated successfully');
                        $location.path('/services/notifications/list')
                    }
                }).catch(function (error) {
                    $scope.loadingNotifications =  false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

    }
})();
