angular
  .module('linagora.esn.unifiedinbox.mailto')
  .run(function($templateCache) {
    $templateCache.put('/unifiedinbox/app/components/composer/boxed/composer-boxed.html', require('esn-frontend-inbox/src/linagora.esn.unifiedinbox/app/components/composer/boxed/composer-boxed.pug'));
  })
  .run(function(sessionFactory, mailtoMailComposer) {
    sessionFactory.bootstrapSession().then(() => {
      mailtoMailComposer.openComposer();
    });
  });
