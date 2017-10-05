(function () {
    'use strict';

    angular.module('BlurAdmin.pages.users')
        .controller('UsersCtrl', UsersCtrl);

    /** @ngInject */
    function UsersCtrl($scope,environmentConfig,$http,typeaheadService,$state,
                       cookieManagement,errorHandler,Upload,$window,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.currenciesList = JSON.parse($window.sessionStorage.currenciesList || '[]');
        $scope.usersStateMessage = '';
        $scope.users = [];
        $scope.creatingUser = false;
        $scope.newUserParams = {
            nationality: "US"
        };

        $scope.usersPagination = {
            itemsPerPage: 25,
            pageNo: 1,
            maxSize: 5
        };

        $scope.usersSearchParams = {
            searchIdentifier:'',
            searchEmail:'',
            searchMobileNumber: '',
            searchFirstName:'',
            searchLastName: '',
            searchStatus: 'Status',
            searchCurrency: {},
            searchJoinedDateFrom: '',
            searchJoinedDateTo: '',
            searchLastLoginDateFrom: '',
            searchLastLoginDateTo: '',
            searchKycVerified: 'Status'
        };

        $scope.statusOptions = ['Status','True','False'];
        $scope.currencyOptions = [];

        //for angular datepicker
        $scope.dateObj = {};
        $scope.dateObj.format = 'MM/dd/yyyy';
        $scope.popup1 = {};
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.popup2 = {};
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.popup3 = {};
        $scope.open3 = function() {
            $scope.popup3.opened = true;
        };

        $scope.popup4 = {};
        $scope.open4 = function() {
            $scope.popup4.opened = true;
        };

        $scope.getUsersEmailTypeahead = typeaheadService.getUsersEmailTypeahead();
        $scope.getUsersMobileTypeahead = typeaheadService.getUsersMobileTypeahead();

        vm.getCompanyCurrencies = function(){
            //adding currency as default value in both results array and ng-model of currency
            vm.currenciesList.splice(0,0,{code: 'Currency'});
            $scope.usersSearchParams.searchCurrency.code = 'Currency';
            $scope.currencyOptions = vm.currenciesList;
        };
        vm.getCompanyCurrencies();

        if($state.params.currencyCode){
            vm.currenciesList.forEach(function (element) {
                if(element.code ==  $state.params.currencyCode){
                    $scope.usersSearchParams.searchCurrency = element;
                }
            });
        }

        vm.getUsersUrl = function(){
            vm.filterParams = '?page=' + $scope.usersPagination.pageNo + '&page_size=' + $scope.usersPagination.itemsPerPage
                + '&identifier__contains=' + ($scope.usersSearchParams.searchIdentifier ?  $scope.usersSearchParams.searchIdentifier : '')
                + '&email__contains=' + ($scope.usersSearchParams.searchEmail ?  encodeURIComponent($scope.usersSearchParams.searchEmail) : '')
                + '&mobile_number__contains=' + ($scope.usersSearchParams.searchMobileNumber ?  encodeURIComponent($scope.usersSearchParams.searchMobileNumber) : '')
                + '&first_name__contains=' + ($scope.usersSearchParams.searchFirstName ?  $scope.usersSearchParams.searchFirstName : '')
                + '&last_name__contains=' + ($scope.usersSearchParams.searchLastName ?  $scope.usersSearchParams.searchLastName : '')
                + '&date_joined__gt=' + ($scope.usersSearchParams.searchJoinedDateFrom? Date.parse($scope.usersSearchParams.searchJoinedDateFrom) : '')
                + '&date_joined__lt=' + ($scope.usersSearchParams.searchJoinedDateTo? Date.parse($scope.usersSearchParams.searchJoinedDateTo) : '')
                + '&last_login__gt=' + ($scope.usersSearchParams.searchLastLoginDateFrom? Date.parse($scope.usersSearchParams.searchLastLoginDateFrom) : '')
                + '&last_login__lt=' + ($scope.usersSearchParams.searchLastLoginDateTo? Date.parse($scope.usersSearchParams.searchLastLoginDateTo) : '')
                + '&kyc_verified=' + ($scope.usersSearchParams.searchKycVerified == 'Status' ? '' : $scope.usersSearchParams.searchKycVerified == 'True' ? true : false)
                + '&currency__code=' + ($scope.usersSearchParams.searchCurrency.code ? ($scope.usersSearchParams.searchCurrency.code == 'Currency' ? '' : $scope.usersSearchParams.searchCurrency.code) : '');

            return environmentConfig.API + '/admin/users/' + vm.filterParams;
        };

        $scope.getAllUsers = function(applyFilter){
            $scope.usersStateMessage = '';
            $scope.loadingUsers = true;

            if(applyFilter){
                $scope.usersPagination.pageNo = 1;
            }

            if($scope.users.length > 0 ){
                $scope.users.length = 0;
            }

            var usersUrl = vm.getUsersUrl();

            $http.get(usersUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingUsers = false;
                if (res.status === 200) {
                    $scope.usersData = res.data.data;
                    $scope.users = res.data.data.results;
                    if($scope.users.length == 0){
                        $scope.usersStateMessage = 'No users have been found';
                        return;
                    }
                    $scope.usersStateMessage = '';
                }
            }).catch(function (error) {
                $scope.loadingUsers = false;
                $scope.usersStateMessage = 'Failed to load data';
                errorHandler.evaluateErrors(error.data);
                errorHandler.handleErrors(error);
            });
        };
        $scope.getAllUsers();

        $scope.addNewUser = function (newUserParams) {
            $scope.loadingUsers = true;
            Upload.upload({
                url: environmentConfig.API + '/admin/users/',
                data: newUserParams,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token},
                method: "POST"
            }).then(function (res) {
                if (res.status === 201) {
                    $scope.newUserParams = {
                        nationality: "US"
                    };
                    $scope.toggleAddUserView();
                    $scope.getAllUsers();
                    toastr.success('User successfully added');
                }
            }).catch(function (error) {
                $scope.loadingUsers = false;
                errorHandler.evaluateErrors(error.data);
                errorHandler.handleErrors(error);
            });
        };

        $scope.toggleAddUserView = function () {
            $scope.creatingUser = !$scope.creatingUser;
            $scope.newUserParams = {
                nationality: "US"
            };
        }
    }
})();
