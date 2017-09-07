(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.permissionsAndManagement')
        .controller('PermissionsAndManagementModalCtrl', PermissionsAndManagementModalCtrl);

    function PermissionsAndManagementModalCtrl($scope,permissionGroup,$uibModalInstance,cookieManagement,environmentConfig,toastr,errorToasts,$http) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.deletingPermissionGroups = false;
        $scope.permissionGroup = permissionGroup;

        $scope.deletePermissionGroup = function () {
            if(vm.token) {
                $scope.deletingPermissionGroups = true;
                $http.delete(environmentConfig.API + '/admin/permission-groups/' + permissionGroup.name + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.deletingPermissionGroups = false;
                    if (res.status === 200) {
                        toastr.success('Permission group successfully deleted');
                        $uibModalInstance.close($scope.permissionGroup);
                    }
                }).catch(function (error) {
                    $scope.permissionGroupsParams = {};
                    $scope.deletingPermissionGroups = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
    }

})();
