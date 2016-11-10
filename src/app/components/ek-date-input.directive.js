(function(){
  angular.module('ek-ui-bootstrap').directive('ekDateInput', ekDateInput);

    'use strict';

    ekDateInput.$inject = ['DateUtils'];
    function ekDateInput(DateUtils){
      var ekDateInputDirective = {
        restrict      : 'E',
        require       : 'ngModel',
        templateUrl   : 'app/components/ek-date-input.tmpl.html',
        scope         : true,
        replace       : true,
        link          : link
      };

      function link($scope, $element, $attrs, ngModel){
        ngModel.$render = updateScope;
        var regexp = DateUtils.dateRegexp();
        $scope.$watch('dateModel', onChangeDateModel);

        var date2StringFormat;
        function onChangeDateModel(newValue){
            if(newValue && newValue instanceof Date){
              date2StringFormat = DateUtils.convertLocalDateToServer(newValue);
            }else{
              date2StringFormat = undefined;
            }

            ngModel.$setViewValue(date2StringFormat);

        }

        function updateScope() {
          if (regexp.test(ngModel.$modelValue)){
            $scope.dateModel = DateUtils.convertLocalDateFromServer(ngModel.$modelValue);
          }else{
              $scope.dateModel = undefined;
          }
        }

        var input = $element.find('input');
        input.mask(DateUtils.dateMask());
        $scope.openCalendar = openCalendar;
        $scope.isOpen = false;
        $scope.dateformat = $attrs.dateFormat || 'dd/MM/yyyy';

        input.attr('name', $attrs.name);
        function openCalendar () {
            $scope.isOpen = true;
        }


      }

      return ekDateInputDirective;
    }

  })();
