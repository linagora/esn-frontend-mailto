require('../mail-status/mail-status.constants');
require('../mail-status/mail-status.service');

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
      const messageFromSearchParams = inboxMailtoParser($location.search().uri);

      newComposerService.open(messageFromSearchParams, {
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
