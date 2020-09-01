require('../mail-status/mail-status.constants');
require('../mail-status/mail-status.service');

angular
  .module('linagora.esn.unifiedinbox.mailto')
  .service('mailtoMailComposer', function(
    $location,
    $window,
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
      mailtoMailStatus.updateStatus(MAILTO_MAIL_STATUSES.INITIAL);

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
        onFail: function (reopenComposer) {
          mailtoMailStatus.updateStatus(MAILTO_MAIL_STATUSES.FAILED, { reopenComposer });
        },
        onDiscarding: function (reopenDraft) {
          mailtoMailStatus.updateStatus(MAILTO_MAIL_STATUSES.DISCARDING, { reopenDraft });
        },
        onDiscard: function () {
          // When the email has been successfully sent, the draft will be discarded, but we don't want
          // to change the mail status from 'sent' to 'discarded' here.
          if (mailtoMailStatus.getStatus() === MAILTO_MAIL_STATUSES.SENT) return;

          mailtoMailStatus.updateStatus(MAILTO_MAIL_STATUSES.DISCARDED);

          $window.close();
        }
      });
    }
  });
