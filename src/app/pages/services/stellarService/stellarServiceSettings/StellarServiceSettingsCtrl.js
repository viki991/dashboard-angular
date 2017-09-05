(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService.stellarServiceSettings')
        .controller('StellarServiceSettingsCtrl', StellarServiceSettingsCtrl);

    /** @ngInject */
    function StellarServiceSettingsCtrl($scope,$http,cookieManagement,errorToasts,$state) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.serviceUrl = cookieManagement.getCookie('SERVICEURL');
        vm.webhookUrl = "https://stellar.services.rehive.io/api/1/hooks/debit/";
        $scope.updatingCompanyDetails =  false;
        $scope.stellarSettingView = '';

        $scope.goToStellarSetting = function (setting) {
            $scope.stellarSettingView = setting;
        };

        vm.getCompanyDetails = function () {
            $scope.updatingCompanyDetails =  true;
            if(vm.token) {
                $http.get(vm.serviceUrl + 'admin/company/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.updatingCompanyDetails =  false;
                    if (res.status === 200) {
                        $scope.company = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.updatingCompanyDetails =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getCompanyDetails();

        $scope.goToTransactionsWebhooks = function(secret){
            $state.go('webhooks.transactionWebhooks',{"secret": secret,"webhookUrl": vm.webhookUrl});
        };


        $scope.goToUsersWebhooks = function(secret){
            $state.go('webhooks.userWebhooks',{"secret": secret});
        };

    }

})();
