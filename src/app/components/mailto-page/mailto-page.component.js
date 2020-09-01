require('./mailto-page.controller');

angular.module('linagora.esn.unifiedinbox.mailto')
  .component('mailtoPage', {
    template: require('./mailto-page.pug'),
    controller: 'MailtoPageController'
  });
