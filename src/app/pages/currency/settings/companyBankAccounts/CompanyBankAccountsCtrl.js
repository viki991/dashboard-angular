(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.companyBankAccounts')
        .controller('CompanyBankAccountsCtrl', CompanyBankAccountsCtrl);

    /** @ngInject */
    function CompanyBankAccountsCtrl($rootScope,$scope,environmentConfig,$http,cookieManagement,errorHandler,toastr,_) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingCompanyBankAccounts = true;
        $scope.updatedBankAccounts = [];

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                vm.getCompanyBankAccounts();
            }
        });

        vm.getCompanyBankAccounts = function(){
            if(vm.token) {
                $scope.loadingCompanyBankAccounts = true;
                $http.get(environmentConfig.API + '/admin/bank-accounts/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        vm.getSingleCurrencyBankAccounts(res.data.data);
                    }
                }).catch(function (error) {
                    $scope.loadingCompanyBankAccounts = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        vm.getSingleCurrencyBankAccounts = function(companyBankAccounts){
            if(vm.token) {
                $http.get(environmentConfig.API + '/admin/currencies/' + $rootScope.selectedCurrency.code + '/bank-accounts/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingCompanyBankAccounts = false;
                    if (res.status === 200) {
                        if(res.data.data.results.length > 0 ){
                            var currencyBankAccountsIds =_.pluck(res.data.data.results, 'id');
                            vm.checkSelectedBankAccount(companyBankAccounts,currencyBankAccountsIds);
                        } else {
                            $scope.companyBankAccounts = companyBankAccounts;
                        }
                    }
                }).catch(function (error) {
                    $scope.loadingCompanyBankAccounts = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        vm.checkSelectedBankAccount = function (companyBankAccounts,currencyBankAccountsIds){
            currencyBankAccountsIds.forEach(function (id) {
                companyBankAccounts.forEach(function(bankAccount){
                    if(bankAccount.id == id){
                        bankAccount.checked = true;
                    }
                })
            });

            $scope.companyBankAccounts = companyBankAccounts;
        };

        $scope.saveMarkedBankAccounts = function (bank) {
            var elementExistsInArray;
            $scope.updatedBankAccounts.forEach(function (element,index,array) {
                if(bank.id == element.id){
                    array.splice(index,1);
                    elementExistsInArray = true;
                }

            });

            if(elementExistsInArray){
                return;
            }


            if(bank.checked){
                $scope.updatedBankAccounts.push({id: bank.id,checked: true});
            } else {
                $scope.updatedBankAccounts.push({id: bank.id,checked: false});
            }
        };

        $scope.saveBankAccounts = function () {

            if($scope.updatedBankAccounts.length == 0){
                toastr.success('No new changes detected');
            }

            $scope.updatedBankAccounts.forEach(function (element) {
                if(element.checked){
                    vm.activateBankAccountForCurrency(element.id);
                } else {
                    vm.deleteBankAccountForCurrency(element.id);
                }
            })
            $scope.updatedBankAccounts = [];
        };

        vm.activateBankAccountForCurrency = function(id){
            $scope.loadingCompanyBankAccounts = true;
            if(vm.token) {
                $http.post(environmentConfig.API + '/admin/currencies/' + $rootScope.selectedCurrency.code + '/bank-accounts/', {id: id} ,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingCompanyBankAccounts = false;
                    toastr.success('Bank successfully added');
                }).catch(function (error) {
                    $scope.loadingCompanyBankAccounts = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        vm.deleteBankAccountForCurrency = function(id){
            $scope.loadingCompanyBankAccounts = true;
            if(vm.token) {
                $http.delete(environmentConfig.API + '/admin/currencies/' + $rootScope.selectedCurrency.code + '/bank-accounts/' +id +'/',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingCompanyBankAccounts = false;
                    toastr.success('Bank successfully removed');
                }).catch(function (error) {
                    $scope.loadingCompanyBankAccounts = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

    }
})();
