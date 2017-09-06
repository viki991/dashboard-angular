(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.permissionsAndManagement')
        .controller('PermissionsAndManagementModalCtrl', PermissionsAndManagementModalCtrl);

    function PermissionsAndManagementModalCtrl($scope,permission,$uibModalInstance,cookieManagement,environmentConfig,toastr,errorToasts,$http) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.deletingPermissions = false;
        $scope.permission = permission;

        $scope.deletePermissionGroup = function () {
            if(vm.token) {
                $scope.deletingPermissions = true;
                $http.delete(environmentConfig.API + '/admin/permission-groups/' + permission.name + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.deletingPermissions = false;
                    if (res.status === 200) {
                        toastr.success('Permission group successfully deleted');
                        $uibModalInstance.close($scope.permission);
                    }
                }).catch(function (error) {
                    $scope.permissionGroupsParams = {};
                    $scope.deletingPermissions = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
    }

})();
