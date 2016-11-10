(function() {
    'use strict';

    angular
        .module('ek-ui-bootstrap')
        .directive('eurekaLogo', eurekaLogo);
    
    function eurekaLogo() {
        var directive = {
            restrict: 'E',
            templateUrl : 'app/components/eureka-logo.html',           
            replace : true
        };

        return directive;
    }
})();
