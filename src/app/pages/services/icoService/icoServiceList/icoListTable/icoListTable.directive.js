(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.icoServiceList')
        .directive('icoListTable', icoListTable);

    /** @ngInject */
    function icoListTable() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/services/icoService/icoServiceList/icoListTable/icoListTable.html'
        };
    }
})();