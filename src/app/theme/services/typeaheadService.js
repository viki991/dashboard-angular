(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .service('typeaheadService', typeaheadService);

    /** @ngInject */
    function typeaheadService($http,environmentConfig,_,cookieManagement) {

        return {
                getUsersTypeahead : function () {
                    return function (email) {
                        if(email.length > 0){
                            var token = cookieManagement.getCookie('TOKEN');
                            return $http.get(environmentConfig.API + '/admin/users/?page_size=10&email__contains=' + encodeURIComponent(email), {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': token
                                }
                            }).then(function (res) {
                                return _.pluck(res.data.data.results,'email');
                            });
                        }
                    }
                }
        }
    }

})();