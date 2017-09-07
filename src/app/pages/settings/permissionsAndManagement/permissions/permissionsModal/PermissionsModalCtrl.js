(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.permissions')
        .controller('PermissionsModalCtrl', PermissionsModalCtrl);

    function PermissionsModalCtrl($scope,permission,permissionGroupName,$uibModalInstance,cookieManagement,environmentConfig,toastr,errorToasts,$http) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.deletingPermission = false;
        $scope.permission = permission;
        vm.permissionGroupName = permissionGroupName;

        $scope.deletePermission = function () {
            if(vm.token) {
                $scope.deletingPermission = true;
                $http.delete(environmentConfig.API + '/admin/permission-groups/' + vm.permissionGroupName + '/permissions/' + permission.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.deletingPermission = false;
                    if (res.status === 200) {
                        toastr.success('Permission successfully deleted');
                        $uibModalInstance.close($scope.permission);
                    }
                }).catch(function (error) {
                    $scope.deletingPermission = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
    }

})();
