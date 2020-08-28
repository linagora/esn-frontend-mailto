'use strict';

const noop = angular.noop;

angular.module('ng.deviceDetector', [])
  .factory('deviceDetector', function() {
    return {
      isMobile: function() {
        return false;
      }
    };
  })
  .constant('DEVICES', {});

angular.module('esn.router', [])
  .service('$state', noop)
  .constant('$stateParams', {});

angular.module('esn.header', [])
  .service('subHeaderService', noop)
  .constant('ESN_SUBHEADER_HEIGHT_MD', 0);

angular.module('linagora.esn.unifiedinbox', [])
