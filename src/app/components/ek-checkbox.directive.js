(function(){
  angular.module('ek-ui-bootstrap').directive('ekCheckbox', ekCheckbox);

    'use strict';

    function ekCheckbox(){
      var ekCheckboxDirectiver = {
        restrict      : 'E',
        templateUrl   : 'app/components/ek-checkbox.tmpl.html',
        scope         : {ngModel : '='},
        replace       : true,
        link          : link
      };

      function link($scope, $element, $attrs){ 
        var config = { selectedClass: 'btn-success', 
                       selectedIcon: 'glyphicon-ok',
                       selectedLabel: 'SIM',
                       unselectedClass:'btn-default',
                       unselectedIcon: 'glyphicon-ban-circle text-muted',
                       unselectedLabel: 'NAO'};
        $scope.showLabel = angular.isDefined($attrs.hideLabel);       

        $scope.ngModel = $scope.ngModel == true;
        $scope.$watch('ngModel', onChangeModel);

        if(angular.isUndefined($attrs.normalRadius)){
          $element.addClass('btn-round');
        }

        config.selectedLabel    = angular.isDefined($attrs.selectedLabel)   ? $attrs.selectedLabel : 'SIM';
        config.unselectedLabel  = angular.isDefined($attrs.unselectedLabel) ? $attrs.unselectedLabel : 'NAO';

        $scope.showLabel =  angular.isDefined($attrs.showLabel) ? angular.fromJson($attrs.unselectedLabel) : true;

        var statePrefix;
        
        $element.bind('click', onClick);
        sincrhonizeView();

        function onChangeModel(){
          sincrhonizeView();
        }

        function onClick(){
          $scope.ngModel = !$scope.ngModel; 
          $scope.$apply();       
        }

        function sincrhonizeView(){
          statePrefix = $scope.ngModel ? 'selected' : 'unselected';
          $scope.itemClass = config[statePrefix + 'Class'];
          $scope.iconClass = config[statePrefix + 'Icon'];   
          $scope.label = config[statePrefix + 'Label'];    
        }
      }

      return ekCheckboxDirectiver;
    }

  })();