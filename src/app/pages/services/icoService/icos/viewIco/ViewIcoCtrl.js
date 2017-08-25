(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.icoService.viewIco')
        .controller('ViewIcoCtrl', ViewIcoCtrl);

    /** @ngInject */
    function ViewIcoCtrl($scope,$http,cookieManagement,errorToasts,$location,toastr,$stateParams,$ngConfirm) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.serviceUrl = cookieManagement.getCookie('SERVICEURL');
        $scope.defaultImageUrl = "/assets/img/app/placeholders/hex_grey.svg";

        $scope.goToIcoOptions = function(path){
            $location.path('/services/ico/' + $stateParams.id + path);
        }




    }
})();
