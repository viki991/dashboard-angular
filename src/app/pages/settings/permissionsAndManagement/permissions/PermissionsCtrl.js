(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.permissions')
        .controller('PermissionsCtrl', PermissionsCtrl);

    /** @ngInject */
    function PermissionsCtrl($scope,$stateParams,environmentConfig,$http,cookieManagement,errorToasts,toastr,$uibModal,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.permissionGroupName = $stateParams.permissionGroupName;
        vm.checkedLevels = [];
        $scope.loadingPermissions = true;
        $scope.editingPermissions = false;
        $scope.viewingPermissions = false;
        $scope.permissionGroupsParams = {};
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

        $scope.levelChanged = function(level){
            if(vm.checkedLevels.indexOf(level) > -1){
                var index = vm.checkedLevels.indexOf(level);
                vm.checkedLevels.splice(index,1);
            } else {
                vm.checkedLevels.push(level);
            }
        };

        vm.getPermissions = function () {
            if(vm.token) {
                $scope.loadingPermissions = true;
                $http.get(environmentConfig.API + '/admin/permission-groups/' + vm.permissionGroupName + '/permissions/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingPermissions = false;
                    if (res.status === 200) {
                        $scope.permissions = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingPermissions = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getPermissions();

        $scope.addPermissionProcess = function(){
            console.log(vm.checkedLevels)
            vm.checkedLevels.forEach(function(element,idx,array){
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
                $http.post(environmentConfig.API + '/admin/permission-groups/' + vm.permissionGroupName + '/permissions/', newPermissionObj, {
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
                            vm.getPermissions();
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


        $scope.openPermissionsModal = function (page, size,permission) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'PermissionsModalCtrl',
                resolve: {
                    permission: function () {
                        return permission;
                    },
                    permissionGroupName: function(){
                        return vm.permissionGroupName;
                    }
                }
            });

            vm.theModal.result.then(function(permission){
                if(permission){
                    vm.getPermissions();
                }
            }, function(){
            });
        };

    }
})();
