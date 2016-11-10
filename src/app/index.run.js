(function() {
  'use strict';

  angular
    .module('ek-ui-bootstrap')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
