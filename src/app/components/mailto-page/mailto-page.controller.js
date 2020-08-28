require('../../services/mail-status/mail-status.constants');
require('../../services/mail-status/mail-status.service');
require('../../services/mail-composer/mail-composer.service');

angular
  .module('linagora.esn.unifiedinbox.mailto')
  .controller('MailtoPageController', function(
    $scope,
    $timeout,
    $window,
    esnI18nService,
    mailtoMailComposer,
    mailtoMailStatus,
    MAILTO_MAIL_STATUS_EVENTS,
    MAILTO_MAIL_STATUSES
  ) {
    const self = this;

    self.status = mailtoMailStatus.getStatus();
    self.MAILTO_MAIL_STATUSES = {
      ...MAILTO_MAIL_STATUSES,
      TRANSITION: 'transition',
    };

    $scope.$on(MAILTO_MAIL_STATUS_EVENTS.UPDATED, (event, newStatus, options) => {
      if (newStatus === self.MAILTO_MAIL_STATUSES.SENT || newStatus === self.MAILTO_MAIL_STATUSES.FAILED) {
        self.status = self.MAILTO_MAIL_STATUSES.TRANSITION;

        // This has to be 500ms to be in sync with the animation time defined in the LESS file.
        $timeout(() => {
          self.status = newStatus;
        }, 500);

        return;
      }

      self.status = newStatus;

      if (newStatus === self.MAILTO_MAIL_STATUSES.DISCARDING) {
        self.reopenDraft = options.reopenDraft;
        self.reopenDraftButtonTitle = '';

        return;
      }

      if (newStatus === self.MAILTO_MAIL_STATUSES.DISCARDED) {
        self.reopenDraftButtonTitle = esnI18nService.translate('The draft has already been discarded').toString();
      }
    });

    self.sendAnother = () => {
      mailtoMailComposer.openComposer();
    };

    self.closeWindow = () => {
      $window.close();
    };
  });
