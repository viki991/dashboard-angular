(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.permissionsAndManagement')
        .controller('PermissionsAndManagementCtrl', PermissionsAndManagementCtrl);

    /** @ngInject */
    function PermissionsAndManagementCtrl($scope,environmentConfig,$http,cookieManagement,errorHandler,toastr,$uibModal,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingPermissionGroups = true;
        $scope.editingPermissionGroups = false;
        $scope.permissionGroupsParams = {};
        $scope.editPermissionGroupsObj = {};

        $scope.goToGroupPermissions = function(permissionGroupName){
            $location.path('/settings/permissions-and-management/' + permissionGroupName + '/permissions');
        };

        $scope.editPermissionToggle = function (permissionGroup) {
            if(permissionGroup){
                vm.getPermissionGroup(permissionGroup);
            } else {
                vm.getPermissionGroups();
            }

            $scope.editingPermissionGroups = !$scope.editingPermissionGroups;
        };

        $scope.editPermissionGroup = function (editPermissionGroupsObj) {
            if(vm.token) {
                $scope.loadingPermissionGroups = true;
                $http.patch(environmentConfig.API + '/admin/permission-groups/' + editPermissionGroupsObj.name + '/',{name: editPermissionGroupsObj.updateName}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingPermissionGroups = false;
                    if (res.status === 200) {
                        toastr.success('Permission group successfully edited');
                        $scope.editingPermissionGroups = !$scope.editingPermissionGroups;
                        vm.getPermissionGroups();
                    }
                }).catch(function (error) {
                    $scope.loadingPermissionGroups = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        vm.getPermissionGroup = function (permissionGroup) {
            if(vm.token) {
                $scope.loadingPermissionGroups = true;
                $http.get(environmentConfig.API + '/admin/permission-groups/' + permissionGroup.name + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingPermissionGroups = false;
                    if (res.status === 200) {
                        $scope.editPermissionGroupsObj.name = res.data.data.name;
                        $scope.editPermissionGroupsObj.updateName = res.data.data.name;
                    }
                }).catch(function (error) {
                    $scope.loadingPermissionGroups = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        vm.getPermissionGroups = function () {
            if(vm.token) {
                $scope.loadingPermissionGroups = true;
                $http.get(environmentConfig.API + '/admin/permission-groups/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingPermissionGroups = false;
                    if (res.status === 200) {
                        $scope.permissionGroups = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingPermissionGroups = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };
        vm.getPermissionGroups();

        $scope.addPermissionGroup = function (permissionGroupsParams) {
            if(vm.token) {
                $scope.loadingPermissionGroups = true;
                $http.post(environmentConfig.API + '/admin/permission-groups/', permissionGroupsParams, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingPermissionGroups = false;
                    if (res.status === 201) {
                        $scope.permissionGroupsParams = {};
                        toastr.success('Permission group successfully added');
                        vm.getPermissionGroups();
                    }
                }).catch(function (error) {
                    $scope.permissionGroupsParams = {};
                    $scope.loadingPermissionGroups = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        $scope.openManagerPermissionsModal = function (page, size,permissionGroup) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'PermissionsAndManagementModalCtrl',
                resolve: {
                    permissionGroup: function () {
                        return permissionGroup;
                    }
                }
            });

            vm.theModal.result.then(function(permissionGroup){
                if(permissionGroup){
                    vm.getPermissionGroups();
                }
            }, function(){
            });
        };


    }
})();
