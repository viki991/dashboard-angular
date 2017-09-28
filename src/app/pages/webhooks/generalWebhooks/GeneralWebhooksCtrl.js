(function () {
    'use strict';

    angular.module('BlurAdmin.pages.webhooks.generalWebhooks')
        .controller('GeneralWebhooksCtrl', GeneralWebhooksCtrl);

    /** @ngInject */
    function GeneralWebhooksCtrl($scope,environmentConfig,$uibModal,toastr,$filter,$http,cookieManagement,errorHandler,$window,$state) {

        var vm = this;
        vm.updatedGeneralWebhook = {};
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingGeneralWebhooks = true;
        $scope.editGeneralWebhook = {};

        $scope.generalWebhooksParams = {
            event: 'User Create',
            secret: $state.params.secret || ''
        };

        vm.eventOptionsObj = {
            USER_CREATE: 'user.create',
            USER_UPDATE: 'user.update',
            USER_PASSWORD_RESET: 'user.password.reset',
            USER_EMAIL_VERIFY: 'user.email.verify',
            USER_MOBILE_VERIFY: 'user.mobile.verify',
            ADDRESS_CREATE: 'address.create',
            ADDRESS_UPDATE: 'address.update',
            DOCUMENT_CREATE: 'document.create',
            DOCUMENT_UPDATE: 'document.update',
            BANK_ACCOUNT_CREATE: 'bank_account.create',
            BANK_ACCOUNT_UPDATE: 'bank_account.update',
            CRYPTO_ACCOUNT_CREATE: 'crypto_account.create',
            CRYPTO_ACCOUNT_UPDATE: 'crypto_account.update'
        };

        $scope.eventOptions = ['User Create','User Update','User Password Reset','User Email Verify','User Mobile Verify',
            'Address Create','Address Update','Document Create','Document Update',
            'Bank Account Create','Bank Account Update','Crypto Account Create','Crypto Account Update'];

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
                    $scope.editGeneralWebhook.event = $filter('capitalizeDottedSentence')(res.data.data.event);
                    $scope.editGeneralWebhook.event = $filter('capitalizeUnderscoredSentence')($scope.editGeneralWebhook.event);
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

            var event;
            event = generalWebhooksParams.event.toUpperCase();
            event = event.replace(/ /g, '_');
            generalWebhooksParams.event = vm.eventOptionsObj[event];

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
                var event = vm.updatedGeneralWebhook.event.toUpperCase();
                event = event.replace(/ /g, '_');
                vm.updatedGeneralWebhook.event = vm.eventOptionsObj[event];
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
