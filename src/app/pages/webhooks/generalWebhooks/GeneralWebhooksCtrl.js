(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks.generalWebhooks')
        .controller('GeneralWebhooksCtrl', GeneralWebhooksCtrl);

    /** @ngInject */
    function GeneralWebhooksCtrl($scope,environmentConfig,$uibModal,toastr,$http,cookieManagement,errorHandler,$window,$state) {

        var vm = this;
        vm.updatedGeneralWebhook = {};
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingGeneralWebhooks = true;
        $scope.editGeneralWebhook = {};

        $scope.generalWebhooksParams = {
            event: 'User Create',
            secret: $state.params.secret || ''
        };

        $scope.eventOptions = ['User Create','User Update','User Password Reset','User Email Verify','User Mobile Verify'];

        $scope.toggleGeneralWebhooksEditView = function(webhook){
            if(webhook){
                vm.getGeneralWebhook(webhook);
            } else{
                $scope.editGeneralWebhook = {};
                vm.getGeneralWebhooks();
            }
            $scope.editingGeneralWebhook = !$scope.editingGeneralWebhook;
        };

        vm.getGeneralWebhook = function (webhook) {
            $scope.loadingGeneralWebhooks = true;
            $http.get(environmentConfig.API + '/admin/webhooks/' + webhook.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingGeneralWebhooks = false;
                if (res.status === 200) {
                    $scope.editGeneralWebhook = res.data.data;
                    $scope.editGeneralWebhook.event = $scope.editGeneralWebhook.event == 'user.create' ?
                        'User Create' : $scope.editGeneralWebhook.event == 'user.update' ? 'User Update' : $scope.editGeneralWebhook.event == 'user.password.reset' ? 'User Password Reset': $scope.editGeneralWebhook.event == 'user.email.verify' ?
                                'User Email Verify': $scope.editGeneralWebhook.event == 'user.mobile.verify' ? 'User Mobile Verify': '';
                }
            }).catch(function (error) {
                $scope.loadingGeneralWebhooks = false;
                errorHandler.evaluateErrors(error.data);
                errorHandler.handleErrors(error);
            });
        };

        vm.getGeneralWebhooks = function () {
            if(vm.token) {
                $scope.loadingGeneralWebhooks = true;
                $http.get(environmentConfig.API + '/admin/webhooks/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingGeneralWebhooks = false;
                    if (res.status === 200) {
                        $scope.generalWebhooks = res.data.data;
                        $window.scrollTo(0, 0);
                    }
                }).catch(function (error) {
                    $scope.loadingGeneralWebhooks = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };
        vm.getGeneralWebhooks();

        $scope.addGeneralWebhooks = function (generalWebhooksParams) {
            $scope.loadingGeneralWebhooks = true;
            generalWebhooksParams.event = generalWebhooksParams.event == 'User Create' ?
             'user.create' : generalWebhooksParams.event == 'User Update' ? 'user.update' : generalWebhooksParams.event == 'User Password Reset' ? 'user.password.reset' : generalWebhooksParams.event == 'User Email Verify' ?
             'user.email.verify' : generalWebhooksParams.event == 'User Mobile Verify' ? 'user.mobile.verify' : '';
            $http.post(environmentConfig.API + '/admin/webhooks/', generalWebhooksParams, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingGeneralWebhooks = false;
                if (res.status === 201) {
                    vm.getGeneralWebhooks();
                    toastr.success('You have successfully added the webhook');
                    $scope.generalWebhooksParams = {event: 'User Create'};
                    $window.scrollTo(0, 0);
                }
            }).catch(function (error) {
                $scope.generalWebhooksParams = {event: 'User Create'};
                $scope.loadingGeneralWebhooks = false;
                errorHandler.evaluateErrors(error.data);
                errorHandler.handleErrors(error);
            });
        };

        $scope.generalWebhookChanged = function(field){
            vm.updatedGeneralWebhook[field] = $scope.editGeneralWebhook[field];
        };

        $scope.updateGeneralWebhook = function () {
            $window.scrollTo(0, 0);
            $scope.editingGeneralWebhook = !$scope.editingGeneralWebhook;
            $scope.loadingGeneralWebhooks = true;
            if(vm.updatedGeneralWebhook.event){
            vm.updatedGeneralWebhook.event = vm.updatedGeneralWebhook.event == 'User Create' ?
               'user.create' : vm.updatedGeneralWebhook.event == 'User Update' ? 'user.update' : vm.updatedGeneralWebhook.event == 'User Password Reset' ? 'user.password.reset' : vm.updatedGeneralWebhook.event == 'User Email Verify' ?
               'user.email.verify' : vm.updatedGeneralWebhook.event == 'User Mobile Verify' ? 'user.mobile.verify' : '';
           }
            $http.patch(environmentConfig.API + '/admin/webhooks/' + $scope.editGeneralWebhook.id + '/', vm.updatedGeneralWebhook, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingGeneralWebhooks = false;
                if (res.status === 200) {
                    vm.updatedGeneralWebhook = {};
                    vm.getGeneralWebhooks();
                    toastr.success('You have successfully updated the webhook');
                }
            }).catch(function (error) {
                $scope.loadingGeneralWebhooks = false;
                vm.updatedGeneralWebhook = {};
                errorHandler.evaluateErrors(error.data);
                errorHandler.handleErrors(error);
            });
        };

        vm.findIndexOfGeneralWebhook = function(element){
            return this.id == element.id;
        };

        $scope.openGeneralWebhooksModal = function (page, size,generalWebhook) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'GeneralWebhooksModalCtrl',
                scope: $scope,
                resolve: {
                    generalWebhook: function () {
                        return generalWebhook;
                    }
                }
            });

            vm.theModal.result.then(function(generalWebhook){
                var index = $scope.generalWebhooks.findIndex(vm.findIndexOfGeneralWebhook,generalWebhook);
                $scope.generalWebhooks.splice(index, 1);
            }, function(){
            });
        };
    }
})();
