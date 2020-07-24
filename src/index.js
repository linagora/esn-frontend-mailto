require('esn-frontend-inbox/src/esn.inbox.libs/app/app.module.js');
require('sanitize-html/dist/sanitize-html.js');
require('angularjs-dragula/dist/angularjs-dragula.js');
require('jmap-draft-client/dist/jmap-draft-client.js');
require('ui-select/dist/select.js');

require('esn-frontend-common-libs/src/frontend/vendor-libs');

// mock everything we do not need
require('./app/mailto.mocks.js');

// then require everything we need...


require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/directives/main.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/config/config.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/new-composer/new-composer.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/jmap-helper/jmap-helper.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/email-body/email-body.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/with-jmap-client/with-jmap-client.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/jmap-client-wrapper/jmap-client-wrapper.service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/jmap-client-provider/jmap-client-provider.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/generate-jwt-token/generate-jwt-token.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/custom-role-mailbox/custom-role-mailbox.service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/identities/inbox-identities.service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/identities/inbox-users-identities-api-client.service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/mailboxes/mailboxes-service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/mailboxes/shared-mailboxes.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/mailboxes/shared-mailboxes.constants.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/mailboxes/special-mailboxes.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/mailto-parser/mailto-parser.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/user-quota/user-quota-service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/user-quota/user-quota-service.constants.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/hook/email-sending-hook.service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/hook/email-composing-hook.service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/attachment-upload/inbox-attachment-upload.service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/attachment-provider-registry/attachment-provider-registry.service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/attachment-jmap/attachment-jmap.service.js');
require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/services/attachment-jmap/attachment-jmap.constants.js');
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

require('./app/mailto.js');
require('./app/all.less');
