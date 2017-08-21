(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.ethereumService.ethereumServiceSettings')
        .controller('EthereumServiceSettingsCtrl', EthereumServiceSettingsCtrl);

    /** @ngInject */
    function EthereumServiceSettingsCtrl($scope,$http,cookieManagement,toastr,errorToasts,$state) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.defaultImageUrl = "https://clariturehealth.com/wp-content/uploads/2016/09/Hexagon-Gray.png";
        $scope.ethereumSettingView = '';
        $scope.loadingHdkeys =  true;
        $scope.addingHdkey =  false;

        $scope.goToEthereumSetting = function (setting) {
            $scope.ethereumSettingView = setting;
        };

        vm.getHdkeys = function () {
            $scope.loadingHdkeys =  true;
            if(vm.token) {
                $http.get('https://ethereum.s.services.rehive.io/api/1/admin/hdkeys/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    console.log(res.data.data.results);
                    $scope.loadingHdkeys =  false;
                    if (res.status === 200) {
                        $scope.hdKeysList = res.data.data.results;
                    }
                }).catch(function (error) {
                    console.log(error);
                    $scope.loadingHdkeys =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getHdkeys();

        $scope.toggleAddHdkeyView = function(){
            $scope.addingHdkey = !$scope.addingHdkey;
        };

    }

})();
