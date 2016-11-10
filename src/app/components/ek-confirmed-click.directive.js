(function(){
  angular.module('ek-ui-bootstrap').directive('ekConfirmedClick', ekConfirmedClick);

    'use strict';

    ekConfirmedClick.$inject = ['$timeout'];
    function ekConfirmedClick($timeout){
      var ekConfirmedClick = {
        restrict      : 'A',  
        scope         : {ekConfirmedClick : '&'},
        link          : link
      };

      function link($scope, $element){
        var confirmed = false;
        var offPromise;
        $element.addClass('ek-btn-confirm');      
        
        toOff();

        $element.click(toggleConfirm);

        function toggleConfirm(){
          confirmed = confirmed = $element.hasClass('on');
          if(confirmed){
            $scope.ekConfirmedClick();     
          }else{
            $element.removeClass('off');
            $element.addClass('on');           
            addToolTip();
            showToolTip();
          }

          scheduleToOff();
        }

        function scheduleToOff(){
          $timeout.cancel(offPromise);
          offPromise = $timeout(toOff, 3000);
        }

        function toOff(){
          if($element.is(':hover')){
            scheduleToOff();
            return;
          }

          removeToolTip();
          $element.removeClass('on');
          $element.addClass('off');
        }    

        function addToolTip(){
          $element.attr('data-toggle', 'tooltip');
          
          $element.attr('title', 'Clique para Confirmar!');
        }

        function removeToolTip(){
          $element.removeAttr('data-toggle');
          $element.removeAttr('data-placement');
          $element.removeAttr('title'); 
          $element.tooltip('destroy');
        }

        function showToolTip(){       
          $element.tooltip('show');
        }
      }

      return ekConfirmedClick;
    }

  })();