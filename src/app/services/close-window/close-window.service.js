'use strict';

const RETURN_VALUE = 'Are you sure you want to leave?';

angular
  .module('linagora.esn.unifiedinbox.mailto')
  .service('mailtoCloseWindowService', mailtoCloseWindowService);

function mailtoCloseWindowService($window, $rootScope, mailtoMailStatus, MAILTO_MAIL_STATUSES, INBOX_EVENTS) {
  return {
    setup
  };

  function setup() {
    // the notificaiton listener will not be called if the user did not have any interaction with the page as defined in the spec
    // ie, if you do not click, nor fill a filed, the event will be discarded

    // Saving draft means being able to send an HTTP request BUT here we can not do any async operation
    // The reason to not use XHR here: https://www.chromestatus.com/feature/4664843055398912
    // Suggested to use fetch with keepalive: https://javascript.info/fetch-api#keepalive but limit of all the requests sent with the flag are 64kb...
    //
    // Also, another alternative is to use `navigator.sendBeacon` which has also limitations:
    // https://dev.to/chromiumdev/sure-you-want-to-leavebrowser-beforeunload-event-4eg5
    // then it is up to the dev to manage headers
    // https://stackoverflow.com/questions/40523469/navigator-sendbeacon-to-pass-header-information

    // having a returnValue is required by the but never displayed by the browser
    $window.onbeforeunload = event => {
      event.preventDefault();

      const mustWarn = mailtoMailStatus.getStatus() === MAILTO_MAIL_STATUSES.INITIAL;

      if (!mustWarn) {
        return;
      }

      $rootScope.$emit(INBOX_EVENTS.CLOSE_COMPOSER_WARNING);

      event.returnValue = RETURN_VALUE;

      return RETURN_VALUE;
    };
  }
}
