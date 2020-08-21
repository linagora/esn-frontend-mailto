const mailSentIcon = require('!svg-inline-loader!../../../../assets/undraw_MailSent.svg');
const mailFailedIcon = require('!svg-inline-loader!../../../../assets/undraw_MailFailed.svg');
require('../../services/mail-status/mail-status.constants');
require('../../services/mail-status/mail-status.service');
require('../../services/mail-composer/mail-composer.service');

angular
  .module('linagora.esn.unifiedinbox.mailto')
  .controller('MailtoPageController', function(
    $scope,
    $sce,
    $timeout,
    $window,
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
    self.mailSentIcon = $sce.trustAsHtml(mailSentIcon);
    self.mailFailedIcon = $sce.trustAsHtml(mailFailedIcon);

    $scope.$on(MAILTO_MAIL_STATUS_EVENTS.UPDATED, (event, newStatus) => {
      if (newStatus !== self.MAILTO_MAIL_STATUSES.SENDING) {
        self.status = self.MAILTO_MAIL_STATUSES.TRANSITION;

        // This has to be 500ms to be in sync with the animation time defined in the LESS file.
        $timeout(() => {
          self.status = newStatus;
        }, 500);

        return;
      }

      self.status = newStatus;
    });

    self.onSendAnother = () => {
      mailtoMailComposer.openComposer();
    };

    self.onCloseWindow = () => {
      $window.close();
    };
  });
