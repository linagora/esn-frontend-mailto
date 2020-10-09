angular
  .module('linagora.esn.unifiedinbox.mailto')
  .factory('inboxMailtoParser', function() {
    return function(mailto) {
      var message = {};

      if (mailto) {
        const { searchParams, pathname } = new URL(mailto);

        // A "mailto" URL (https://fr.wikipedia.org/wiki/Mailto) has the following syntax:
        //  mailto:<comma-separated recipient(s)>[?subject&body&cc&bcc]
        message.to = csvRecipientsToEMailerArray(pathname);
        message.subject = searchParams.get('subject');
        message.textBody = searchParams.get('body');
        message.htmlBody = message.textBody;
        message.cc = csvRecipientsToEMailerArray(searchParams.get('cc'));
        message.bcc = csvRecipientsToEMailerArray(searchParams.get('bcc'));
      }

      return message;
    };

    /////

    function csvRecipientsToEMailerArray(recipients) {
      if (!recipients) {
        return [];
      }

      return recipients.split(/[,;]/).map(recipient => ({
        name: recipient,
        email: recipient
      }));
    }
  });
