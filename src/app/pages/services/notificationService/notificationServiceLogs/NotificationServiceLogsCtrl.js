(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceLogs')
        .controller('NotificationServiceLogsCtrl', NotificationServiceLogsCtrl);

    /** @ngInject */
    function NotificationServiceLogsCtrl($scope,$http,cookieManagement,$uibModal,errorHandler,$ngConfirm,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.baseUrl = cookieManagement.getCookie('SERVICEURL');
        $scope.loadingLogs =  false;
        $scope.notificationLogs = [];

        $scope.pagination = {
            itemsPerPage: 25,
            pageNo: 1,
            maxSize: 5
        };

        vm.getNotificationLogsUrl = function(){

            vm.filterParams = '?page=' + $scope.pagination.pageNo + '&page_size=' + $scope.pagination.itemsPerPage; // all the params of the filtering

            return vm.baseUrl + 'admin/logs/' + vm.filterParams;
        };

        $scope.getNotificationLogs = function () {
            $scope.loadingLogs =  true;

            var notificationLogsUrl = vm.getNotificationLogsUrl();

            if(vm.token) {
                $http.get(notificationLogsUrl, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingLogs =  false;
                    if (res.status === 200) {
                        $scope.notificationLogsData = res.data.data;
                        $scope.notificationLogs = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingLogs =  false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };
        $scope.getNotificationLogs();

        $scope.resendNotificationPrompt = function (log) {
            $ngConfirm({
                title: 'Resend notification',
                content: "Resend the notification to the following recipient: <strong>" + log.recipient + "</strong> ?",
                animationBounce: 1,
                animationSpeed: 100,
                scope: $scope,
                buttons: {
                    close: {
                        text: "No",
                        btnClass: 'btn-default dashboard-btn'
                    },
                    Add: {
                        text: "Yes",
                        btnClass: 'btn-primary dashboard-btn',
                        keys: ['enter'], // will trigger when enter is pressed
                        action: function(scope,button){
                            $scope.resendNotification(log);
                        }
                    }
                }
            });
        };

        $scope.resendNotification = function (notificationLog) {
            $scope.loadingLogs =  true;
            if(vm.token) {
                $http.post(vm.baseUrl + 'admin/logs/' + notificationLog.id + /send/,{recipient: notificationLog.recipient}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingLogs =  false;
                    if (res.status === 200) {
                        toastr.success('Notification successfully resent');
                        $scope.getNotificationLogs();
                    }
                }).catch(function (error) {
                    $scope.loadingLogs =  false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

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
