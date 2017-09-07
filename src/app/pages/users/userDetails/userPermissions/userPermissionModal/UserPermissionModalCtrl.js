(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserPermissionModalCtrl', UserPermissionModalCtrl);

    function UserPermissionModalCtrl($scope,$uibModalInstance,userPermission,uuid,toastr,$http,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.userPermission = userPermission;
        vm.uuid = uuid;
        $scope.deletingUserPermission = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteUserPermission = function () {
            $scope.deletingUserPermission = true;
            $http.delete(environmentConfig.API + '/admin/users/' + vm.uuid + '/permissions/' + $scope.userPermission.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingUserPermission = false;
                if (res.status === 200) {
                    toastr.success('User permission successfully deleted');
                    $uibModalInstance.close($scope.userPermission);
                }
            }).catch(function (error) {
                $scope.deletingUserPermission = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
