angular.module('linagora.esn.unifiedinbox.mailto')
  .constant('MAILTO_MAIL_STATUS_EVENTS', {
    UPDATED: 'mailto:mailStatus:updated'
  })
  .constant('MAILTO_MAIL_STATUSES', {
    INITIAL: 'initial',
    SENDING: 'sending',
    SENT: 'sent',
    FAILED: 'failed'
  });
