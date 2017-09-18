(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.listNotificationServiceNotifications')
        .controller('ListNotificationServiceNotificationsCtrl', ListNotificationServiceNotificationsCtrl);

    /** @ngInject */
    function ListNotificationServiceNotificationsCtrl($scope,$http,cookieManagement,$uibModal,errorHandler,$location,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.baseUrl = cookieManagement.getCookie('SERVICEURL');
        $scope.loadingNotifications =  false;

        vm.getNotificationsList = function () {
            $scope.loadingNotifications =  true;
            $scope.notificationsList = [];
            if(vm.token) {
                $http.get(vm.baseUrl + 'admin/notifications/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingNotifications =  false;
                    if (res.status === 200) {
                        $scope.notificationsList = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingNotifications =  false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };
        vm.getNotificationsList();

        $scope.goToAddNotificationView = function () {
            $location.path('/services/notifications/create');
        };

        $scope.goToNotificationEditView = function (notification) {
            $location.path('/services/notifications/' + notification.id + '/edit');
        };

        vm.findIndexOfNotification = function(element){
            return this.id == element.id;
        };

        $scope.openNotificationModal = function (page, size,notification) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'NotificationServiceNotificationModalCtrl',
                scope: $scope,
                resolve: {
                    notification: function () {
                        return notification;
                    }
                }
            });

            vm.theModal.result.then(function(notification){
                var index = $scope.notificationsList.findIndex(vm.findIndexOfNotification,notification);
                $scope.notificationsList.splice(index, 1);
            }, function(){
            });
        };


    }

})();
