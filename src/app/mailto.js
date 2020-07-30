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
  'esn.desktop-utils',
  'esn.form.helper',
  'esn.background',
  'esn.configuration',
  'esn.core',
  'esn.escape-html',
  'esn.async-action',
  'esn.user',
  'esn.session',
  'esn.registry',
  'esn.module-registry',
  'esn.user-configuration',
  'esn.datetime',
  'esn.i18n',
  'esn.http',
  'esn.promise',
  'esn.chips',
  'openpaas-logo',

  'ngAnimate',
  'material.core',
  'material.components.icon',
  'material.components.menu',
  'material.components.button',
  'material.components.backdrop',
  'material.components.menuBar',
  'esn.inbox.libs'

]);

/*
  Careful: some modules are mocked in mailto.mocks.js
*/
require('esn-frontend-inbox/src/esn.inbox.libs/app/app.module.js');

require('esn-frontend-common-libs/src/frontend/js/modules/touchscreen-detector');
require('esn-frontend-common-libs/src/frontend/js/modules/textarea-autosize');
require('esn-frontend-common-libs/src/frontend/js/modules/esn.waves');
require('esn-frontend-common-libs/src/frontend/js/modules/esn.autolinker-wrapper');
require('esn-frontend-common-libs/src/frontend/js/modules/ui');
require('esn-frontend-common-libs/src/frontend/js/modules/avatar');
require('esn-frontend-common-libs/src/frontend/js/modules/media-query');
require('esn-frontend-common-libs/src/frontend/js/modules/profile-popover-card/profile-popover-card.module');
require('esn-frontend-common-libs/src/frontend/js/modules/box-overlay/box-overlay.module');
require('esn-frontend-common-libs/src/frontend/js/modules/notification');
require('esn-frontend-common-libs/src/frontend/js/modules/file');
require('esn-frontend-common-libs/src/frontend/js/modules/profile');
require('esn-frontend-common-libs/src/frontend/js/modules/esn.summernote');
require('esn-frontend-common-libs/src/frontend/js/modules/attendee/attendee.module');
require('esn-frontend-common-libs/src/frontend/js/modules/people/people.module');
require('esn-frontend-common-libs/src/frontend/js/modules/scroll');
require('esn-frontend-common-libs/src/frontend/js/modules/attachments-selector/attachments-selector.module');
require('esn-frontend-common-libs/src/frontend/js/modules/esn.offline');
require('esn-frontend-common-libs/src/frontend/js/modules/desktop-utils');
require('esn-frontend-common-libs/src/frontend/js/modules/form-helper/form-helper.module');
require('esn-frontend-common-libs/src/frontend/js/modules/background');
require('esn-frontend-common-libs/src/frontend/js/modules/config/config.module');
require('esn-frontend-common-libs/src/frontend/js/modules/core');
require('esn-frontend-common-libs/src/frontend/js/modules/escape-html');
require('esn-frontend-common-libs/src/frontend/js/modules/async-action');
require('esn-frontend-common-libs/src/frontend/js/modules/user/user.module');
require('esn-frontend-common-libs/src/frontend/js/modules/session');
require('esn-frontend-common-libs/src/frontend/js/modules/core');
require('esn-frontend-common-libs/src/frontend/js/modules/registry');
require('esn-frontend-common-libs/src/frontend/js/modules/module-registry/module-registry.module');
require('esn-frontend-common-libs/src/frontend/js/modules/user-configuration/user-configuration.module');
require('esn-frontend-common-libs/src/frontend/js/modules/datetime/datetime.module');
require('esn-frontend-common-libs/src/frontend/js/modules/i18n/i18n.module');
require('esn-frontend-common-libs/src/frontend/js/modules/http');
require('esn-frontend-common-libs/src/frontend/js/modules/promise/promise.module');
require('esn-frontend-common-libs/src/frontend/js/modules/chips/chips.module');

require('./mailto.constants.js');
require('./routes');
require('./mailto.run.js');

require('./services/mail-status/mail-status.service');
require('./services/mail-status/mail-status.constants');
require('./services/mail-composer/mail-composer.service');
require('./components/mailto-page/mailto-page.component');
