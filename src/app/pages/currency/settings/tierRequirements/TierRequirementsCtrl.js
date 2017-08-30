(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierRequirements')
        .controller('TierRequirementsCtrl', TierRequirementsCtrl);

    /** @ngInject */
    function TierRequirementsCtrl($rootScope,$scope,cookieManagement,$http,environmentConfig,errorToasts,_,toastr,$window,$timeout) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.activeTabIndex = 0;

        var capitalize = function (fieldName) {
            return fieldName.replace(/_/g,' ').replace(/\b\w/g, function(l){ return l.toUpperCase() });
        }

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                $scope.getAllTiers();
            }
        });

        $scope.getAllTiers = function(tierLevel){
            if(vm.token) {
                $http.get(environmentConfig.API + '/admin/tiers/?currency=' + $rootScope.selectedCurrency.code, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        vm.unsortedTierLevelsArray = _.pluck(res.data.data ,'level');
                        vm.sortedTierLevelsArray = vm.unsortedTierLevelsArray.sort(function(a, b) {
                            return a - b;
                        });
                        $scope.tierLevelsForRequirements = vm.sortedTierLevelsArray;
                        $scope.allTiers = res.data.data.sort(function(a, b) {
                            return parseFloat(a.level) - parseFloat(b.level);
                        });
                        if(tierLevel){
                          $scope.selectTier(tierLevel);
                        } else {
                          $timeout(function(){
                              $scope.activeTabIndex = 0;
                            });
                          $scope.selectTier($scope.tierLevelsForRequirements[0]);
                        }
                    }
                }).catch(function (error) {
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.findIndexOfTier = function(element){
            return this == element.level;
        };

        $scope.selectTier = function(tierLevel){
            var index = $scope.allTiers.findIndex(vm.findIndexOfTier,tierLevel);
            $scope.selectedTier = $scope.allTiers[index];
            if($scope.selectedTier){
                $scope.getTierRequirements();
            }
        };

        $scope.getTierRequirements = function(){
            if(vm.token) {
                $http.get(environmentConfig.API + '/admin/tiers/' + $scope.selectedTier.id + '/requirements/',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        vm.checkRequirementsInTier(res.data.data);
                    }
                }).catch(function (error) {
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.checkRequirementsInTier = function(requirementsArray){
            $scope.tierRequirementFields = {};
            requirementsArray.forEach(function(element){
                var fieldString = element.requirement.toLowerCase().trim();
                var fieldName = fieldString.replace(/ /g,'_');
                $scope.tierRequirementFields[fieldName] = true;
            });
        };

        $scope.toggleTierRequirements = function(fieldName){
            $window.scrollTo(0,0);
            if($scope.tierRequirementFields[fieldName]){
                $scope.saveTierRequirements(fieldName);
            } else {
                $scope.deleteTierRequirements(fieldName);
            }
        };

        $scope.saveTierRequirements = function(fieldName){
            if(vm.token) {
                $http.post(environmentConfig.API + '/admin/tiers/' + $scope.selectedTier.id + '/requirements/' , {"requirement": fieldName} ,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 201) {
                        $scope.selectedTier.requirements.push(res.data.data)
                        toastr.success(capitalize(fieldName) + ' successfully added to tier.')
                    }
                }).catch(function (error) {
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.findRequirementId =  function(fieldName){
            var requirementId;
            
            $scope.selectedTier.requirements.forEach(function(element){
                if(element.requirement == capitalize(fieldName)){
                    requirementId = element.id;
                }
            });

            return requirementId;
        };

        $scope.deleteTierRequirements = function(fieldName){
            var requirementId = vm.findRequirementId(fieldName);
            if(vm.token) {
                $http.delete(environmentConfig.API + '/admin/tiers/' + $scope.selectedTier.id + '/requirements/' + requirementId + '/',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.selectedTier.requirements = $scope.selectedTier.requirements.filter(function(e) {
                            return e.id !== requirementId
                        })
                        toastr.success(capitalize(fieldName) + ' successfully deleted from tier.')
                    }
                }).catch(function (error) {
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

    }
})();
