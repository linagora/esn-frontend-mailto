window.jstz = require('esn-frontend-common-libs/src/frontend/components/jstzdetect/jstz.js');
window.jQuery = require('jquery/dist/jquery.js');
window.$ = window.jQuery;

require('esn-frontend-common-libs/src/frontend/vendor-libs.js');
require('sanitize-html/dist/sanitize-html.js');
require('angularjs-dragula/dist/angularjs-dragula.js');
require('jmap-draft-client/dist/jmap-draft-client.js');
require('ui-select/dist/select.js');
require('angular-mocks/angular-mocks.js');

require('./app/app.mocks.js');
require('esn-frontend-inbox/src/esn.inbox.libs/app/app.module.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/directives/main.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/new-composer/new-composer.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/mailto-parser/mailto-parser.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/user-quota/user-quota-service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/user-quota/user-quota-service.constants.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/attachment-upload/inbox-attachment-upload.service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/attachment-provider-registry/attachment-provider-registry.service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/attachment-jmap/attachment-jmap.service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/attachment-jmap/attachment-jmap.run.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/request-receipts/request-receipts.constants.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/request-receipts/request-receipts-service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/draft/draft.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/attachment-alternative-uploader/attachment-alternative-uploader-modal.service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/attachment-alternative-uploader/attachment-alternative-uploader-modal.controller.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/body-editor/html/composer-body-editor-html.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/body-editor/html/composer-body-editor-html.controller.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/body-editor/text/composer-body-editor-text.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/body-editor/text/composer-body-editor-text.controller.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/composer.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/composer.controller.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/attachments/composer-attachments.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/attachments/composer-attachments.controller.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/boxed/composer-boxed.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/mobile/composer-mobile.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/mobile/composer-mobile.controller.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/identity-selector/composer-identity-selector.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/identity-selector/composer-identity-selector.controller.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/attachments-selector/composer-attachments-selector.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/inbox-configuration/read-receipt/read-receipt.component.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/inbox-configuration/read-receipt/read-receipt.controller.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/banner/vacation-banner/vacation-banner.component.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/banner/vacation-banner/vacation-banner.controller.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/banner/quota-banner/quota-banner.component.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/banner/quota-banner/quota-banner.controller.js');
require('./app/app.module.js');

require('../test/config/mocks/injector.js');
require('../test/config/mocks/ng-mock-component.js');
require('../test/config/mocks/reset-dynamic-directive-injections.js');

const sinonChai = require('sinon-chai/lib/sinon-chai.js');
const shallowDeepEqual = require('chai-shallow-deep-equal/chai-shallow-deep-equal.js');
const chaiDatetime = require('chai-datetime/chai-datetime.js');

/* global chai */
chai.use(sinonChai);
chai.use(shallowDeepEqual);
chai.use(chaiDatetime);

// require all test files using special Webpack feature
// https://webpack.github.io/docs/context.html#require-context
const testsContext = require.context('.', true, /\.spec$/);

testsContext.keys().forEach(testsContext);
