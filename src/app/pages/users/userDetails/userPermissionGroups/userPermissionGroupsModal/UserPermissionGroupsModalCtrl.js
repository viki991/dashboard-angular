(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserPermissionGroupsModalCtrl', UserPermissionGroupsModalCtrl);

    function UserPermissionGroupsModalCtrl($scope,$uibModalInstance,userPermissionGroup,uuid,toastr,$http,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.userPermissionGroup = userPermissionGroup;
        vm.uuid = uuid;
        $scope.deletingUserPermissionGroup = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteUserPermissionGroup = function () {
            $scope.deletingUserPermissionGroup = true;
            $http.delete(environmentConfig.API + '/admin/users/' + vm.uuid + '/permission-groups/' + $scope.userPermissionGroup.name + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingUserPermissionGroup = false;
                if (res.status === 200) {
                    toastr.success('User permission group successfully deleted');
                    $uibModalInstance.close($scope.userPermissionGroup);
                }
            }).catch(function (error) {
                $scope.deletingUserPermissionGroup = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
