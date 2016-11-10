(function() {
  'use strict';

  angular
    .module('ek-ui-bootstrap')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();
