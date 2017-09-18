(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceLogs')
        .controller('NotificationServiceLogsCtrl', NotificationServiceLogsCtrl);

    /** @ngInject */
    function NotificationServiceLogsCtrl($scope,$http,cookieManagement,$uibModal,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.baseUrl = cookieManagement.getCookie('SERVICEURL');
        $scope.loadingLogs =  false;
        $scope.notificationLogs = [];

        vm.getNotificationLogs = function () {
            $scope.loadingLogs =  true;
            if(vm.token) {
                $http.get(vm.baseUrl + 'admin/logs/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingLogs =  false;
                    if (res.status === 200) {
                        $scope.notificationLogs = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingLogs =  false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };
        vm.getNotificationLogs();

        $scope.openNotificationServiceLogsModal = function (page, size,log) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'NotificationServiceLogsModalCtrl',
                resolve: {
                    log: function () {
                        return log;
                    }
                }
            });
        };


    }
})();
