(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.createNotificationServiceNotification', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('notificationService.createNotificationServiceNotification', {
                url: '/create',
                views: {
                    'notificationServiceViews' : {
                        templateUrl:'app/pages/services/notificationService/notificationServiceNotifications/createNotificationServiceNotification/createNotificationServiceNotification.html',
                        controller: "CreateNotificationServiceNotificationsCtrl"
                    }
                },
                title: 'Notifications'
            });
    }

})();
