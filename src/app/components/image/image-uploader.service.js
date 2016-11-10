(function () {
   angular.module('ek-ui-bootstrap').service('ImageUploader', ImageUploader);

    'use strict';

    ImageUploader.$inject = ['Upload', '$filter'];

    function ImageUploader(Upload, $filter){
      var service = {};
      service.getErroParam      = getErroParam;
      service.syncrhonizeError  = syncrhonizeError;
      service.argsToOptions     = argsToOptions;
      service.startFileUpload   = startFileUpload;

       function argsToOptions(args, options){
        options.minWidth   = angular.isDefined(args.minWidth)   ?   args.minWidth   : 200;
        options.minHeight  = angular.isDefined(args.minHeight)  ?   args.minHeight  : 200;
        options.maxSize    = angular.isDefined(args.maxSize)    ?   args.maxSize    : '2MB';  
       }

       function getErroParam(errFile, options){
          var params = {imageName: errFile.name};
          params.minWidth   = options.minWidth;
          params.minHeight  = options.minHeight;
          params.maxSize    = options.maxSize;   
          return params;       
        }

        function syncrhonizeError(errFiles, options){
          var errorFileIndex;
          var errorFile;
          var message;
          if(angular.isArray(errFiles)){
            for (errorFileIndex = errFiles.length - 1; errorFileIndex >= 0; errorFileIndex--) {
              errorFile = errFiles[errorFileIndex];
              message = $filter('translate')( 'error.' + errorFile.$error,getErroParam(errorFile, options));             
              options.onError({message: message});
            }
          }          
        }

        function startFileUpload (file, url) {
            return Upload.upload({url: url ,file: file});
        }

        return service;

    }


})();