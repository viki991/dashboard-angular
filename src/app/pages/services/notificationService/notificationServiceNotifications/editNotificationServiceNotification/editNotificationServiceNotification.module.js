(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.editNotificationServiceNotification', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('notificationService.editNotificationServiceNotification', {
                url: '/:id/edit',
                views: {
                    'notificationServiceViews' : {
                        templateUrl:'app/pages/services/notificationService/notificationServiceNotifications/editNotificationServiceNotification/editNotificationServiceNotification.html',
                        controller: "EditNotificationServiceNotificationCtrl"
                    }
                },
                title: 'Notifications'
            });
    }

})();
