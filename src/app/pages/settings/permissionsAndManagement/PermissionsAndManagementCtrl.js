(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.permissionsAndManagement')
        .controller('PermissionsAndManagementCtrl', PermissionsAndManagementCtrl);

    /** @ngInject */
    function PermissionsAndManagementCtrl($scope,environmentConfig,$http,cookieManagement,errorToasts,toastr,$uibModal) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingPermissions = true;
        $scope.editingPermissions = false;
        $scope.permissionGroupsParams = {};
        $scope.editPermissionGroupsObj = {};

        $scope.editPermissionToggle = function (permission) {
            if(permission){
                vm.getPermission(permission);
            } else {
                vm.getPermissions();
            }

            $scope.editingPermissions = !$scope.editingPermissions;
        };

        $scope.editPermissionGroup = function (editPermissionGroupsObj) {
            if(vm.token) {
                $scope.loadingPermissions = true;
                $http.patch(environmentConfig.API + '/admin/permission-groups/' + editPermissionGroupsObj.name + '/',{name: editPermissionGroupsObj.updateName}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingPermissions = false;
                    if (res.status === 200) {
                        toastr.success('Permission group successfully edited');
                        $scope.editingPermissions = !$scope.editingPermissions;
                        vm.getPermissions();
                    }
                }).catch(function (error) {
                    $scope.loadingPermissions = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.getPermission = function (permission) {
            if(vm.token) {
                $scope.loadingPermissions = true;
                $http.get(environmentConfig.API + '/admin/permission-groups/' + permission.name + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingPermissions = false;
                    if (res.status === 200) {
                        $scope.editPermissionGroupsObj.name = res.data.data.name;
                        $scope.editPermissionGroupsObj.updateName = res.data.data.name;
                    }
                }).catch(function (error) {
                    $scope.loadingPermissions = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.getPermissions = function () {
            if(vm.token) {
                $scope.loadingPermissions = true;
                $http.get(environmentConfig.API + '/admin/permission-groups/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingPermissions = false;
                    if (res.status === 200) {
                        $scope.permissionGroups = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingPermissions = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getPermissions();

        $scope.addPermissionGroup = function (permissionGroupsParams) {
            if(vm.token) {
                $scope.loadingPermissions = true;
                $http.post(environmentConfig.API + '/admin/permission-groups/', permissionGroupsParams, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingPermissions = false;
                    if (res.status === 201) {
                        $scope.permissionGroupsParams = {};
                        toastr.success('Permission group successfully added');
                        vm.getPermissions();
                    }
                }).catch(function (error) {
                    $scope.permissionGroupsParams = {};
                    $scope.loadingPermissions = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.openManagerPermissionsModal = function (page, size,permission) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'PermissionsAndManagementModalCtrl',
                resolve: {
                    permission: function () {
                        return permission;
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
