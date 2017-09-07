(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserPermissionsCtrl', UserPermissionsCtrl);

    /** @ngInject */
    function UserPermissionsCtrl($scope,environmentConfig,$stateParams,$http,
                              cookieManagement,errorToasts,toastr,$uibModal) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        vm.checkedLevels = [];
        $scope.loadingUserPermissions = true;
        $scope.addingUserPermission = false;
        $scope.permissionParams = {
            type: 'Account'
        };
        $scope.typeOptionsObj = {
            ACCOUNT : 'account',
            ACCOUNT_CURRENCY : 'accountcurrency',
            ACCOUNT_CURRENCY_FEE : 'accountcurrencyfee',
            ACCOUNT_CURRENCY_LIMIT : 'accountcurrencylimit',
            ACCOUNT_CURRENCY_SWITCH : 'accountcurrencyswitch',
            BANK_ACCOUNT : 'bankaccount',
            BITCOIN_ACCOUNT : 'bitcoinwithdrawalaccount',
            COMPANY : 'company',
            COMPANY_ADDRESS : 'companyaddress',
            COMPANY_BANK_ACCOUNT : 'companybankaccount',
            COMPANY_TRANSACTION_SWITCH : 'companytransactionswitch',
            CURRENCY : 'currency',
            CURRENCY_TIER : 'currencytier',
            CURRENCY_TIER_FEE : 'currencytierfee',
            CURRENCY_TIER_LIMIT : 'currencytierlimit',
            CURRENCY_TIER_REQUIREMENT : 'currencytierrequirement',
            CURRENCY_TIER_SWITCH : 'currencytierswitch',
            DOCUMENT : 'document',
            EMAIL_ADDRESS : 'emailaddress',
            GLOBAL_SWITCH : 'globalswitch',
            LIMIT : 'limit',
            MOBILE : 'mobile',
            NOTIFICATION : 'notification',
            PERMISSION : 'permission',
            PERMISSION_GROUP : 'companypermissiongroup',
            TOKEN : 'authtoken',
            TRANSACTION : 'transaction',
            TRANSACTION_FEE : 'transactionfee',
            TRANSACTION_SUBTYPE : 'transactionsubtype',
            TRANSACTION_SWITCH : 'transactionswitch',
            TRANSACTION_WEBHOOK : 'transactionwebhook',
            USER : 'user',
            USER_ADDRESS : 'useraddress',
            USER_TRANSACTION_SWITCH : 'usertransactionswitch',
            USER_WEBHOOK : 'userwebhook'
        };
        $scope.typeOptions = ['Account','Account Currency','Account Currency Fee','Account Currency Limit','Account Currency Switch',
            'Bank Account','Bitcoin Account','Company','Company Address','Company Bank Account','Company Transaction Switch','Currency',
            'Currency Tier','Currency Tier Fee','Currency Tier Limit','Currency Tier Requirement','Currency Tier Switch','Document',
            'Email Address','Global Switch','Limit','Mobile','Notification','Permission','Permission Group','Token','Transaction',
            'Transaction Fee','Transaction Subtype','Transaction Switch','Transaction Webhook','User','User Address','User Transaction Switch',
            'User Webhook'];

        $scope.toggleAddUserPermissionView = function(){
            $scope.addingUserPermission = !$scope.addingUserPermission;
        };

        $scope.levelChanged = function(level){
            if(vm.checkedLevels.indexOf(level) > -1){
                var index = vm.checkedLevels.indexOf(level);
                vm.checkedLevels.splice(index,1);
            } else {
                vm.checkedLevels.push(level);
            }
        };

        $scope.addPermissionProcess = function(){
            if(vm.checkedLevels.length == 0){
                toastr.error('None of the levels are selected');
                return false;
            }
            vm.checkedLevels.forEach(function(element,idx,array){
                $scope.loadingPermissions = true;
                var type;
                type = $scope.permissionParams.type.toUpperCase();
                type = type.replace(/ /g, '_');
                if(idx === array.length - 1){
                    vm.addPermissions({type: $scope.typeOptionsObj[type],level: element},'last');
                    return false;
                }
                vm.addPermissions({type: $scope.typeOptionsObj[type],level: element});
            });
        };

        vm.addPermissions = function (newPermissionObj,last) {
            if(vm.token) {
                $scope.loadingPermissions = true;
                $http.post(environmentConfig.API + '/admin/users/' + vm.uuid + '/permissions/', newPermissionObj, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 201) {
                        if(last){
                            $scope.loadingPermissions = false;
                            $scope.permissionParams = {
                                type: 'Account'
                            };
                            vm.checkedLevels = [];
                            toastr.success('Permissions successfully added');
                            vm.getUserPermissions();
                            $scope.toggleAddUserPermissionView();
                        }
                    }
                }).catch(function (error) {
                    vm.checkedLevels = [];
                    $scope.permissionParams = {
                        type: 'Account'
                    };
                    $scope.loadingPermissions = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.getUserPermissions = function () {
            $scope.loadingUserPermissions = true;
            $http.get(environmentConfig.API + '/admin/users/' + vm.uuid + '/permissions/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingUserPermissions = false;
                if (res.status === 200) {
                    $scope.userPermissionsList = res.data.data.results;
                }
            }).catch(function (error) {
                $scope.loadingUserPermissions = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserPermissions();

        $scope.openUserPermissionModal = function (page, size, userPermission) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'UserPermissionModalCtrl',
                scope: $scope,
                resolve: {
                    userPermission: function () {
                        return userPermission;
                    },
                    uuid: function () {
                        return vm.uuid;
                    }
                }
            });

            vm.theModal.result.then(function(userPermission){
                if(userPermission){
                    vm.getUserPermissions();
                }
            }, function(){
            });
        };


    }
})();
