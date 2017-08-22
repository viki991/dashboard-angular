/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .directive('mainLoadingImage', mainLoadingImage);

    /** @ngInject */
    function mainLoadingImage() {
        return {
            restrict: 'E',
            template: '<img class="main-spinner" src="assets/img/loading.gif">'
        };
    }

})();