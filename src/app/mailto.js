(function(angular) {
  'use strict';

  angular.module('linagora.esn.unifiedinbox.mailto', [
    'linagora.esn.unifiedinbox',
    'linagora.esn.graceperiod',

    'restangular',
    'angularMoment',
    'ng.deviceDetector',
    'op.dynamicDirective',
    'mgcrea.ngStrap.modal',
    'uuid4',
    'matchmedia-ng',
    // ADDED
    'FBAngular',

    'esn.touchscreen-detector',
    'esn.textarea-autosize',
    'esn.waves',
    'esn.autolinker-wrapper',
    'esn.ui',
    'esn.avatar',
    'esn.media.query',
    'esn.profile-popover-card',
    'esn.router',
    'esn.box-overlay',
    'esn.notification',
    'esn.file',
    'esn.profile',
    'esn.summernote-wrapper',
    'esn.attendee',
    'esn.people',
    'esn.scroll',
    'esn.attachments-selector',
    'esn.header',
    'esn.offline-wrapper',
    'esn.lodash-wrapper',
    'esn.desktop-utils',
    'esn.form.helper',
    'esn.background',
    'esn.configuration',
    'esn.core',
    'esn.escape-html',
    'esn.async-action',
    'esn.user',
    'esn.session',
    'esn.escape-html',
    'esn.registry',
    'esn.module-registry',
    'esn.user-configuration',
    'esn.datetime',
    'esn.i18n',
    'esn.http',
    'esn.promise',
    'esn.chips',

    'ngAnimate',
    'material.core',
    'material.components.icon',
    'material.components.menu',
    'material.components.button',
    'material.components.backdrop',
    'material.components.menuBar'
  ]);

})(angular);

require('./mailto.config.js');
require('./mailto.constants.js');
require('./mailto.run.js');