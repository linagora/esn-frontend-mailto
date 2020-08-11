require('../mail-status/mail-status.constants');
require('../mail-status/mail-status.service');

// TODO: Write tests for this (https://github.com/OpenPaaS-Suite/esn-frontend-mailto/issues/2)
angular
  .module('linagora.esn.unifiedinbox.mailto')
  .service('mailtoMailComposer', function(
    $location,
    BoxOverlayStateManager,
    newComposerService,
    inboxMailtoParser,
    mailtoMailStatus,
    MAILTO_MAIL_STATUSES
  ) {
    return {
      openComposer,
    };

    function openComposer() {
      newComposerService.open(inboxMailtoParser($location.search().uri), {
        closeable: false,
        allowedStates: [],
        initialState: BoxOverlayStateManager.STATES.FULL_SCREEN,
        onSending: function () {
          mailtoMailStatus.updateStatus(MAILTO_MAIL_STATUSES.SENDING);
        },
        onSend: function () {
          mailtoMailStatus.updateStatus(MAILTO_MAIL_STATUSES.SENT);
        },
        onFail: function () {
          mailtoMailStatus.updateStatus(MAILTO_MAIL_STATUSES.FAILED);
        },
      });
    }
  });
