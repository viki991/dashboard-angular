(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserPermissionsCtrl', UserPermissionsCtrl);

    /** @ngInject */
    function UserPermissionsCtrl($scope,environmentConfig,$stateParams,$http,
                              cookieManagement,errorHandler,toastr,$uibModal) {

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
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        vm.getUserPermissions = function () {
            $scope.loadingUserPermissions = true;
            $http.get(environmentConfig.API + '/admin/users/' + vm.uuid + '/permissions/?page_size=200', {
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
                errorHandler.evaluateErrors(error.data);
                errorHandler.handleErrors(error);
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
