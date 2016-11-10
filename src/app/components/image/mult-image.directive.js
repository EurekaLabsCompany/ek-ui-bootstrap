(function(){
  angular.module('ek-ui-bootstrap').directive('multImage', multImage);

    'use strict';

    multImage.$inject = ['$timeout', 'ImageUploader'];

    function multImage($timeout, ImageUploader){
      var multImageDirective = {
        restrict      : 'E',
        templateUrl   : 'app/components/image/mult-image.tmpl.html',
        scope         : {items : '=?', onUpload : '&', onDelete: '&', imageApi:'@' ,  onError: '&'},
        replace       : true,
        link          : link
      };

      function link($scope, $element, $attrs){
        $scope.uploadFiles = uploadFiles;
        $scope.items = $scope.items || [];
        ImageUploader.argsToOptions($attrs, $scope);
        $scope.deleteFile = deleteFile;
        var imgItem;
        var baseHeight;
        var addImageItem = $element.find('.add-image');
        var addImageItemPadding = new Number(addImageItem.css('padding-top').replace('px',''));

        $scope.$watch('items', onChangeItems);

        function onChangeItems(){
          $timeout(syncrhonizeSize, 1000);
        }

        function uploadFiles(files, errFiles) {
          ImageUploader.syncrhonizeError(errFiles, $scope);
          angular.forEach(files, startFileUpload);
        }

        function startFileUpload(file) {
          $scope.uploading = true;
          ImageUploader.startFileUpload(file, $scope.imageApi).then(onUploadFilesSuccess, onUploadFilesError, angular.bind(file, onProgress));
        }

        function onUploadFilesSuccess(response){
          $scope.items.push(response.data);
          $scope.onUpload({data: response.data});
          $scope.uploading = false;
          
        }

        function onUploadFilesError(){
          $scope.uploading = false;
        }

        function onProgress(evt){
          $scope.itemProgress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        }

        function syncrhonizeSize(){

          imgItem = $element.find('.img-item');

          if(imgItem.length > 0){
            baseHeight = imgItem.last().outerHeight()
          }else{
            baseHeight = 150;
          }
          addImageItem.css('height', baseHeight);
          addImageItem.css('width', baseHeight);
          addImageItem.find('.btn-add').css('padding-top', (baseHeight / 2) - ((addImageItem.find('.btn-add').height() / 2) + addImageItemPadding));
        }

        function deleteFile(file) {
          $timeout(function(){
            return $scope.onDelete({data: file})
          }).then(onDeleteSuccess, onDeleteFail)

          function onDeleteSuccess(){
            
          }

          function onDeleteFail(){
            
          }
        }

    }

      return multImageDirective;
    }

  })();
