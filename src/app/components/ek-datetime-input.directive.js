(function(){
  angular.module('ek-ui-bootstrap').directive('ekDatetimeInput', ekDatetimeInput);

    'use strict';

    ekDatetimeInput.$inject = ['DateUtils'];
    function ekDatetimeInput(DateUtils){
      var ekDateInputDirective = {
        restrict      : 'E',
        require       : 'ngModel',
        templateUrl   : 'app/components/ek-datetime-input.tmpl.html',
        scope         : true,
        replace       : true,
        link          : link
      };

      function link($scope, $element, $attrs, ngModel){
        ngModel.$render = updateScope;
        $scope.$watch('dateModel', onChangeDateModel);

        var date2StringFormat;
        function onChangeDateModel(newValue){
            if(newValue && newValue instanceof Date){
              date2StringFormat = DateUtils.convertDatetimeToServer(newValue);
            }else{
              date2StringFormat = undefined;
            }

            ngModel.$setViewValue(date2StringFormat);

        }

        function updateScope() {
          if (ngModel.$modelValue){
            $scope.dateModel = DateUtils.convertDateTimeFromServer(ngModel.$modelValue);
          }else{
              $scope.dateModel = undefined;
          }
        }

        var input = $element.find('input');
        input.mask(DateUtils.datetimeMask());
        $scope.openCalendar = openCalendar;
        $scope.isOpen = false;
        $scope.dateformat = $attrs.dateFormat || 'dd/MM/yyyy HH:mm';

        input.attr('name', $attrs.name);
        function openCalendar () {
            $scope.isOpen = true;
        }


      }

      return ekDateInputDirective;
    }

  })();
