(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks.generalWebhooks')
        .controller('GeneralWebhooksModalCtrl', GeneralWebhooksModalCtrl);

    function GeneralWebhooksModalCtrl($scope,$uibModalInstance,generalWebhook,toastr,$http,environmentConfig,cookieManagement,errorToasts) {

        var vm = this;

        $scope.generalWebhook = generalWebhook;
        $scope.deletingGeneralWebhook = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteGeneralWebhook = function () {
            $scope.deletingGeneralWebhook = true;
            $http.delete(environmentConfig.API + '/admin/webhooks/' + $scope.generalWebhook.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingGeneralWebhook = false;
                if (res.status === 200) {
                    toastr.success('General Webhook successfully deleted');
                    $uibModalInstance.close($scope.generalWebhook);
                }
            }).catch(function (error) {
                $scope.deletingGeneralWebhook = false;
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
