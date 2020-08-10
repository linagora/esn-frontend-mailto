angular.module('linagora.esn.unifiedinbox.mailto')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '*path',
        template: '<mailto-page></mailto-page>'
      });
  });
