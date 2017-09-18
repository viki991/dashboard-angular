(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.debit')
        .controller('DebitCtrl', DebitCtrl);

    /** @ngInject */
    function DebitCtrl($rootScope, $scope, $http, environmentConfig,_,
                       cookieManagement, toastr, errorHandler,
                       $location, $state,sharedResources,currencyModifiers,typeaheadService) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.debitData = {
            user: null,
            amount: null,
            reference: "",
            confirm_on_create: true,
            metadata: "",
            currency: null,
            subtype: "",
            note: "",
            account: ""
        };
        $scope.onGoingTransaction = false;
        $scope.showAdvancedOption = false;
        $scope.showView = 'createDebit';
        sharedResources.getSubtypes().then(function (res) {
            res.data.data = res.data.data.filter(function (element) {
                return element.tx_type == 'debit';
            });
            $scope.subtypeOptions = _.pluck(res.data.data,'name');
            $scope.subtypeOptions.unshift('');
        });

        $scope.getUsersTypeahead = typeaheadService.getUsersTypeahead();

        if ($location.path() === '/transactions/debit/pending') {
            $scope.showView = 'pendingDebit';
        }

        if ($state.params.email) {
            $scope.debitData.user = $state.params.email;
        }

        if ($state.params.account) {
            $scope.debitData.account = $state.params.account;
        }

        $rootScope.$watch('selectedCurrency', function () {
            if ($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                $scope.debitData.currency = $rootScope.selectedCurrency.code;
            }
        });

        $scope.goToView = function (view) {
            if ($scope.debitData.amount) {
                var validAmount = currencyModifiers.validateCurrency($scope.debitData.amount, $rootScope.selectedCurrency.divisibility);
                if (validAmount) {
                    $scope.showView = view;
                } else {
                    toastr.error('Please input amount to ' + $rootScope.selectedCurrency.divisibility + ' decimal places');
                }
            } else {
                $scope.showView = view;
            }
        };

        $scope.displayAdvancedOption = function () {
            $scope.showAdvancedOption = true;
        };

        $scope.toggleDebitView = function (view) {
            $scope.showAdvancedOption = false;
            $scope.debitData = {
                user: null,
                amount: null,
                reference: "",
                confirm_on_create: true,
                metadata: "",
                currency: $rootScope.selectedCurrency.code,
                subtype: "",
                note: "",
                account: ""
            };

            if (view == 'debit') {
                $scope.goToView('createDebit');
                $location.path('/transactions/debit');
            } else {
                $scope.goToView('pendingDebit');
                $location.path('/transactions/debit/pending');
            }
        };

        $scope.createDebitTransaction = function () {

            var sendTransactionData = {
                user: $scope.debitData.user,
                amount: currencyModifiers.convertToCents($scope.debitData.amount, $rootScope.selectedCurrency.divisibility),
                reference: $scope.debitData.reference,
                confirm_on_create: $scope.debitData.confirm_on_create,
                metadata: $scope.debitData.metadata,
                currency: $scope.debitData.currency,
                subtype: $scope.debitData.subtype,
                note: $scope.debitData.note,
                account: $scope.debitData.account
            };

            $scope.onGoingTransaction = true;
            $http.post(environmentConfig.API + '/admin/transactions/debit/', sendTransactionData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.onGoingTransaction = false;
                if (res.status === 201) {
                    toastr.success('You have successfully debited the account!');
                    $scope.goToView('completeDebit');
                }
            }).catch(function (error) {
                $scope.onGoingTransaction = false;
                errorHandler.evaluateErrors(error.data);
                errorHandler.handleErrors(error);
            });
        }

    }
})();
