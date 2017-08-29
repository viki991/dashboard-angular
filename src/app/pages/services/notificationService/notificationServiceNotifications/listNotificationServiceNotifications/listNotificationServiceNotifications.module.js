(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.listNotificationServiceNotifications', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('notificationService.listNotificationServiceNotifications', {
                url: '/list',
                views: {
                    'notificationServiceViews' : {
                        templateUrl:'app/pages/services/notificationService/notificationServiceNotifications/listNotificationServiceNotifications/listNotificationServiceNotifications.html',
                        controller: "ListNotificationServiceNotificationsCtrl"
                    }
                },
                title: 'Notifications'
            });
    }

})();
