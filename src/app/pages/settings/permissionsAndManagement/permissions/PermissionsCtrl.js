(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.permissions')
        .controller('PermissionsCtrl', PermissionsCtrl);

    /** @ngInject */
    function PermissionsCtrl($scope,$stateParams,environmentConfig,$http,cookieManagement,errorHandler,toastr,$uibModal,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.permissionGroupName = $stateParams.permissionGroupName;
        vm.checkedLevels = [];
        $scope.loadingPermissions = true;
        $scope.editingPermissions = false;
        $scope.viewingPermissions = false;
        $scope.permissionParams = {
            type: 'Account'
        };
        $scope.typeOptionsObj = {
            ACCOUNT : 'account',
            ACCOUNT_CURRENCY : 'accountcurrency',
            ACCOUNT_CURRENCY_LIMIT : 'accountcurrencylimit',
            ACCOUNT_CURRENCY_TRANSACTION_FEE : 'accountcurrencytransactionfee',
            ACCOUNT_CURRENCY_TRANSACTION_SWITCH : 'accountcurrencytransactionswitch',
            COMPANY : 'company',
            COMPANY_ADDRESS : 'companyaddress',
            COMPANY_BANK_ACCOUNT : 'companybankaccount',
            COMPANY_TRANSACTION_SWITCH : 'companytransactionswitch',
            CRYPTO_ACCOUNT : 'cryptoaccount',
            CURRENCY : 'currency',
            CURRENCY_TIER : 'currencytier',
            CURRENCY_TIER_LIMIT : 'currencytierlimit',
            CURRENCY_TIER_REQUIREMENT : 'currencytierrequirement',
            CURRENCY_TIER_TRANSACTION_FEE : 'currencytiertransactionfee',
            CURRENCY_TIER_TRANSACTION_SWITCH : 'currencytiertransactionswitch',
            DOCUMENT : 'document',
            EMAIL_ADDRESS : 'emailaddress',
            GENERAL_WEBHOOK : 'generalwebhook',
            GLOBAL_SWITCH : 'globalswitch',
            MOBILE : 'mobile',
            NOTIFICATION : 'notification',
            PERMISSION : 'permission',
            PERMISSION_GROUP : 'companypermissiongroup',
            TOKEN : 'authtoken',
            TRANSACTION : 'transaction',
            TRANSACTION_SUBTYPE : 'transactionsubtype',
            TRANSACTION_WEBHOOK : 'transactionwebhook',
            USER : 'user',
            USER_ADDRESS : 'useraddress',
            USER_BANK_ACCOUNT : 'userbankaccount',
            USER_TRANSACTION_SWITCH : 'usertransactionswitch'
        };

        $scope.typeOptions = ['Account','Account Currency','Account Currency Limit','Account Currency Transaction Fee','Account Currency Transaction Switch',
        'Company','Company Address','Company Bank Account','Company Transaction Switch','Crypto Account','Currency',
        'Currency Tier','Currency Tier Limit','Currency Tier Requirement','Currency Tier Transaction Fee','Currency Tier Transaction Switch','Document',
        'Email Address','General Webhook','Global Switch','Mobile','Notification','Permission','Permission Group','Token','Transaction',
        'Transaction Subtype','Transaction Webhook','User','User Address','User Bank Account','User Transaction Switch'];

        $scope.backToPermissionsAndManagement = function(){
            $location.path('/settings/permissions-and-management');
        };

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
                $http.get(environmentConfig.API + '/admin/permission-groups/' + vm.permissionGroupName + '/permissions/?page_size=200', {
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
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };
        vm.getPermissions();

        $scope.addPermissionProcess = function(){
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
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
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
