(function(){
  angular.module('ek-ui-bootstrap').directive('embeddedImage', embeddedImage);

    'use strict';

    embeddedImage.$inject = ['Upload', '$timeout', 'ImageUploader'];
    
    function embeddedImage(Upload, $timeout, ImageUploader){
     var embeddedImageDirective  = {
        restrict      : 'E',
        templateUrl   : 'app/components/image/embedded-image.tmpl.html',
        scope         : {item : '=?', onError: '&'},
        replace       : true,
        link          : link
      };

      function link($scope, $element, $attrs){ 
        $scope.uploadFiles = uploadFiles; 
        $scope.clearFile = clearFile;
        

        $attrs.$observe('imageUrl', synchonizeImageUrl);
        syncrhonizeView();

        function syncrhonizeView(){
          $timeout(render, 1000);
        }

        function render(){
          var addImagePadding = new Number($element.find('.add-image').css('padding-top').replace('px',''))
          var height = $attrs.height || 200;
          var btnAddHeight = $element.find('.btn-add').height();
          $element.find('.add-image').css('min-height', height + 'px');
          $element.find('.btn-add').css('padding-top', (height / 2) - ((btnAddHeight / 2) + addImagePadding));
        }
        
        function synchonizeImageUrl(){
          if(angular.isDefined($attrs.imageUrl)){
            $scope.item = { $ngfBlobUrl: $attrs.imageUrl};
          }
        }

        ImageUploader.argsToOptions($attrs, $scope);

        function clearFile(){
          delete $scope.item;
          syncrhonizeView();
        }

        function uploadFiles(files, errFiles) {
            ImageUploader.syncrhonizeError(errFiles, $scope);
            $scope.item = files[0];
        }

    }
    

      return embeddedImageDirective;
    }

  })();