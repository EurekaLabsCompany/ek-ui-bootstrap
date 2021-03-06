(function(){
  angular.module('ek-ui-bootstrap').directive('multImage', multImage);

    'use strict';

    multImage.$inject = ['$timeout', 'ImageUploader'];

    function multImage($timeout, ImageUploader){
      var multImageDirective = {
        restrict      : 'E',
        templateUrl   : 'app/components/image/mult-image.tmpl.html',
        scope         : {items : '=?', onUpload : '&', onDelete: '&', onDeleteSuccess:'&', imageApi:'@' ,  onError: '&'},
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
        var filesToUploadQuewe = [];



        $scope.$watch('items', onChangeItems);

        function onChangeItems(){
          $timeout(syncrhonizeSize, 1000);
          $timeout(syncrhonizeMaxFiles, 1000);
        }

        function syncrhonizeMaxFiles(){
          $scope.internalMaxFiles = ($scope.maxFiles - $scope.items.length)
        }

        function uploadFiles(files, errFiles) {
          ImageUploader.syncrhonizeError(errFiles, $scope);
          filesToUploadQuewe = files || [];
          uploadFileFromQuewe();
        }

        function uploadFileFromQuewe() {

          if(filesToUploadQuewe.length === 0){
            $scope.uploading = false;
            return;
          }

          $scope.uploading = true;
          var file = filesToUploadQuewe.pop();
          ImageUploader.startFileUpload(file, $scope.imageApi).then(onUploadFilesSuccess, onUploadFilesError, angular.bind(file, onProgress));
        }

        function onUploadFilesSuccess(response){
          $scope.items.push(response.data);
          $scope.onUpload({data: response.data});
          $timeout(syncrhonizeMaxFiles, 1000);

          if(filesToUploadQuewe.length === 0){
            $scope.uploading = false;
          }else{
            uploadFileFromQuewe();
          }

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
          $scope.onDelete({data: file});
        }

    }

      return multImageDirective;
    }

  })();
