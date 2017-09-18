(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierSwitches')
        .controller('TierSwitchesCtrl', TierSwitchesCtrl);

    /** @ngInject */
    function TierSwitchesCtrl($rootScope,$scope,cookieManagement,$http,environmentConfig,_,
                              sharedResources,$timeout,errorHandler,toastr,$uibModal) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.activeTabIndex = 0;
        $scope.loadingTierSwitches = true;
        $scope.loadingSubtypes = false;
        $scope.editingTierSwitches = false;
        vm.updatedTierSwitch = {};
        $scope.tierSwitchesParams = {
            tx_type: 'Credit',
            enabled: 'False',
            subtype: ''
        };
        $scope.txTypeOptions = ['Credit','Debit'];
        $scope.boolOptions = ['True','False'];

        $scope.getSubtypesArray = function(params,editing){
            $scope.loadingSubtypes = true;
            if(!editing){
                params.subtype = '';
            } else if(!params.subtype && editing){
                params.subtype = '';
            }
            sharedResources.getSubtypes().then(function (res) {
                res.data.data = res.data.data.filter(function (element) {
                    return element.tx_type == (params.tx_type).toLowerCase();
                });
                $scope.subtypeOptions = _.pluck(res.data.data,'name');
                $scope.subtypeOptions.unshift('');
                $scope.loadingSubtypes = false;
            });
        };
        $scope.getSubtypesArray($scope.tierSwitchesParams);

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                $scope.getAllTiers();
            }
        });

        $scope.toggleTierSwitchEditView = function(tierSwitch){
            if(tierSwitch) {
                vm.getTierSwitch(tierSwitch);
            } else {
                $scope.editTierSwitch.enabled == 'True' ? $scope.editTierSwitch.enabled = true : $scope.editTierSwitch.enabled = false;
                $scope.editTierSwitch = {};
                $scope.getAllTiers($scope.selectedTier.level);
            }
            $scope.editingTierSwitches = !$scope.editingTierSwitches;
        };

        vm.getTierSwitch = function (tierSwitch) {
            $scope.loadingTierSwitches = true;
            $http.get(environmentConfig.API + '/admin/tiers/' + $scope.selectedTier.id + '/switches/' + tierSwitch.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingTierSwitches = false;
                if (res.status === 200) {
                    $scope.editTierSwitch = res.data.data;
                    $scope.editTierSwitch.tx_type == 'credit' ? $scope.editTierSwitch.tx_type = 'Credit' : $scope.editTierSwitch.tx_type = 'Debit';
                    $scope.editTierSwitch.enabled == true ? $scope.editTierSwitch.enabled = 'True' : $scope.editTierSwitch.enabled = 'False';
                    $scope.getSubtypesArray($scope.editTierSwitch,'editing');
                }
            }).catch(function (error) {
                $scope.loadingTierSwitches = false;
                errorHandler.evaluateErrors(error.data);
                errorHandler.handleErrors(error);
            });
        };

        $scope.getAllTiers = function(tierLevel){
            if(vm.token) {
                $scope.loadingTierSwitches = true;
                $http.get(environmentConfig.API + '/admin/tiers/?currency=' + $rootScope.selectedCurrency.code, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTierSwitches = false;
                    if (res.status === 200) {
                        vm.unsortedTierLevelsArray = _.pluck(res.data.data ,'level');
                        vm.sortedTierLevelsArray = vm.unsortedTierLevelsArray.sort(function(a, b) {
                            return a - b;
                        });
                        $scope.tierLevelsForSwitches = vm.sortedTierLevelsArray;
                        $scope.allTiers = res.data.data.sort(function(a, b) {
                            return parseFloat(a.level) - parseFloat(b.level);
                        });
                        if(tierLevel){
                            $scope.selectTier(tierLevel);
                        } else {
                            $timeout(function(){
                                $scope.activeTabIndex = 0;
                            });
                            $scope.selectTier($scope.tierLevelsForSwitches[0]);
                        }
                    }
                }).catch(function (error) {
                    $scope.loadingTierSwitches = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        vm.findIndexOfTier = function(element){
            return this == element.level;
        };

        $scope.selectTier = function(tierLevel){
            $scope.editingTierSwitches = false;
            var index = $scope.allTiers.findIndex(vm.findIndexOfTier,tierLevel);
            $scope.selectedTier = $scope.allTiers[index];
            if($scope.selectedTier){
                $scope.getTierSwitches();
            }
        };

        $scope.getTierSwitches = function(){
            if(vm.token) {
                $scope.loadingTierSwitches = true;
                $http.get(environmentConfig.API + '/admin/tiers/' + $scope.selectedTier.id + '/switches/',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTierSwitches = false;
                    if (res.status === 200) {
                        $scope.tiersSwitchesList = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingTierSwitches = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        $scope.addTierSwitch = function(tierSwitchesParams){
            if(vm.token) {
                $scope.loadingTierSwitches = true;
                tierSwitchesParams.tx_type = tierSwitchesParams.tx_type.toLowerCase();
                tierSwitchesParams.enabled == 'True' ? tierSwitchesParams.enabled = true : tierSwitchesParams.enabled = false;
                $http.post(environmentConfig.API + '/admin/tiers/' + $scope.selectedTier.id + '/switches/',tierSwitchesParams,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTierSwitches = false;
                    if (res.status === 201) {
                        toastr.success('Switch added successfully to tier');
                        $scope.tierSwitchesParams = {
                            tx_type: 'Credit',
                            enabled: 'False',
                            subtype: ''
                        };
                        $scope.getSubtypesArray($scope.tierSwitchesParams);
                        $scope.getAllTiers($scope.selectedTier.level);
                    }
                }).catch(function (error) {
                    $scope.tierSwitchesParams = {
                        tx_type: 'Credit',
                        enabled: 'False',
                        subtype: ''
                    };
                    $scope.getSubtypesArray($scope.tierSwitchesParams);
                    $scope.loadingTierSwitches = false;
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        $scope.tierSwitchChanged = function(field){
            vm.updatedTierSwitch[field] = $scope.editTierSwitch[field];
        };

        $scope.updateTierSwitch = function(){

            if(!$scope.editTierSwitch.subtype){
                vm.updatedTierSwitch.subtype = '';
            }

            if(vm.token) {
                $scope.loadingTierSwitches = true;
                $scope.editingTierSwitches = !$scope.editingTierSwitches;
                vm.updatedTierSwitch.tx_type ? vm.updatedTierSwitch.tx_type = vm.updatedTierSwitch.tx_type.toLowerCase() : '';
                vm.updatedTierSwitch.enabled == 'True' ? vm.updatedTierSwitch.enabled = true : vm.updatedTierSwitch.enabled = false;

                $http.patch(environmentConfig.API + '/admin/tiers/' + $scope.selectedTier.id + '/switches/' + $scope.editTierSwitch.id + '/',vm.updatedTierSwitch,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTierSwitches = false;
                    if (res.status === 200) {
                        toastr.success('Switch updated successfully');
                        $scope.tierSwitchesParams = {
                            tx_type: 'Credit',
                            enabled: 'False',
                            subtype: ''
                        };
                        vm.updatedTierSwitch = {};
                        $scope.getAllTiers($scope.selectedTier.level);
                    }
                }).catch(function (error) {
                    $scope.tierSwitchesParams = {
                        tx_type: 'Credit',
                        enabled: 'False',
                        subtype: ''
                    };
                    vm.updatedTierSwitch = {};
                    $scope.getAllTiers($scope.selectedTier.level);
                    errorHandler.evaluateErrors(error.data);
                    errorHandler.handleErrors(error);
                });
            }
        };

        vm.findIndexOfTierSwitch = function(element){
            return this.id == element.id;
        };

        $scope.openTierSwitchesModal = function (page, size,tierSwitch) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'TierSwitchesModalCtrl',
                scope: $scope,
                resolve: {
                    tierSwitch: function () {
                        return tierSwitch;
                    },
                    selectedTier: function () {
                        return $scope.selectedTier;
                    }
                }
            });

            vm.theModal.result.then(function(tierSwitch){
                var index = $scope.tiersSwitchesList.findIndex(vm.findIndexOfTierSwitch,tierSwitch);
                $scope.tiersSwitchesList.splice(index, 1);
            }, function(){
            });
        };

    }
})();
