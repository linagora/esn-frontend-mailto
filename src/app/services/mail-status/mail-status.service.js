require('./mail-status.constants');

angular
  .module('linagora.esn.unifiedinbox.mailto')
  .service('mailtoMailStatus', function($rootScope, $log, MAILTO_MAIL_STATUSES, MAILTO_MAIL_STATUS_EVENTS) {
    const self = this;

    self.status = MAILTO_MAIL_STATUSES.INITIAL;

    return {
      getStatus,
      updateStatus
    };

    function getStatus() {
      return self.status;
    }

    function updateStatus(newStatus, options) {
      if (!Object.values(MAILTO_MAIL_STATUSES).includes(newStatus)) {
        return $log.error(
          `Cannot update the mail status since the mail status '${newStatus}' is not allowed.`
        );
      }

      self.status = newStatus;
      $rootScope.$broadcast(MAILTO_MAIL_STATUS_EVENTS.UPDATED, self.status, options);
    }
  });
