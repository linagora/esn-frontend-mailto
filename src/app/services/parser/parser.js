angular
  .module('linagora.esn.unifiedinbox.mailto')
  .factory('inboxMailtoParser', function() {
    return function(mailto) {

      var message = {};

      if (mailto) {

        // A "mailto" URL (https://fr.wikipedia.org/wiki/Mailto) has the following syntax:
        //  mailto:<comma-separated recipient(s)>[?subject&body&cc&bcc]
        message.to = csvRecipientsToEMailerArray(mailto.uri);
        message.subject = mailto.subject;
        message.textBody = mailto.body;
        message.htmlBody = message.textBody;
        message.cc = csvRecipientsToEMailerArray(mailto.cc);
        message.bcc = csvRecipientsToEMailerArray(mailto.bcc);

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
