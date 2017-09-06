(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.subtypes')
        .directive('editPermissionAndManagement', editPermissionAndManagement);

    /** @ngInject */
    function editPermissionAndManagement() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/settings/permissionsAndManagement/editPermissionAndManagement/editPermissionAndManagement.html'
        };
    }
})();
