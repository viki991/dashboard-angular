(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserDetailsCtrl', UserDetailsCtrl);

    /** @ngInject */
    function UserDetailsCtrl($scope,environmentConfig,$http,cookieManagement,$uibModal,
                             errorHandler,$stateParams,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.user = {};
        $scope.user.profile = "/assets/img/app/profile/profile_user.svg";
        $scope.loadingUser = true;
        $scope.profilePictureFile = {
            file: {}
        };

        vm.getUser = function(){
            if(vm.token) {
                $scope.loadingUser = true;
                $http.get(environmentConfig.API + '/admin/users/' + vm.uuid + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUser = false;
                    if (res.status === 200) {
                        $scope.user = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingUser = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };
        vm.getUser();

        $scope.goToSwitchesAndPermissions = function () {
          $location.path('user/' + vm.uuid + '/switches-and-permissions');
        };

        $scope.openUserProfilePictureModal = function (page, size, user) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'UserProfilePictureModalCtrl',
                scope: $scope,
                resolve: {
                    user: function () {
                        return user;
                    }
                }
            });

            vm.theModal.result.then(function(user){
                if(user){
                    vm.getUser();
                }
            }, function(){
            });
        };


    }
})();
