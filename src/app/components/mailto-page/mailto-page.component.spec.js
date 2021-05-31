'use strict';

/* global chai, sinon: false */

const { expect } = chai;

describe('The mailtoPage component', function() {
  let $rootScope, $compile, $window, $timeout, mailtoMailStatusMock, mailtoMailComposerMock, MAILTO_MAIL_STATUSES, MAILTO_MAIL_STATUS_EVENTS;

  beforeEach(function() {
    mailtoMailStatusMock = {};
    mailtoMailComposerMock = {
      openComposer: sinon.stub()
    };

    angular.mock.module('linagora.esn.unifiedinbox.mailto');

    angular.mock.module(function($provide) {
      $provide.value('mailtoMailStatus', mailtoMailStatusMock);
      $provide.value('mailtoMailComposer', mailtoMailComposerMock);
      $provide.value('translateFilter', text => text);
      $provide.value('esnI18nService', {
        translate: text => ({ toString: () => text }),
        getLocale: () => 'en'
      });
      $provide.factory('openpaasLogoSpinner', () => ({}));
    });

    angular.mock.inject(function($httpBackend, _$rootScope_, _$compile_, _$timeout_, _$window_, _$q_, _MAILTO_MAIL_STATUSES_, _MAILTO_MAIL_STATUS_EVENTS_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      $timeout = _$timeout_;
      $window = _$window_;
      this.$httpBackend = $httpBackend;
      MAILTO_MAIL_STATUSES = _MAILTO_MAIL_STATUSES_;
      MAILTO_MAIL_STATUS_EVENTS = _MAILTO_MAIL_STATUS_EVENTS_;
    });

    this.$httpBackend.expectPOST('/api/jwt/generate').respond(201, '123456');
  });

  function initComponent() {
    const scope = $rootScope.$new();
    const element = $compile('<mailto-page></mailto-page>')(scope);

    scope.$digest();

    return element;
  }

  const mailSendingContainerSelector = 'div[ng-if="$ctrl.status === $ctrl.MAILTO_MAIL_STATUSES.SENDING || $ctrl.status === $ctrl.MAILTO_MAIL_STATUSES.TRANSITION"]';
  const mailSentContainerSelector = 'div[ng-if="$ctrl.status === $ctrl.MAILTO_MAIL_STATUSES.SENT"]';
  const mailFailedContainerSelector = 'div[ng-if="$ctrl.status === $ctrl.MAILTO_MAIL_STATUSES.FAILED"]';
  const draftContainerSelector = 'div[ng-if="$ctrl.status === $ctrl.MAILTO_MAIL_STATUSES.DISCARDING || $ctrl.status === $ctrl.MAILTO_MAIL_STATUSES.DISCARDED"]';

  describe('When mail is being sent', function() {

    it('should show openpaas logo spinner when mail is being sent', function() {
      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.SENDING;

      const element = initComponent();

      expect(element.find(`${mailSendingContainerSelector} div`).attr('openpaas-logo-spinner')).to.exist;
    });

    it('should still show openpaas logo spinner when the animation transition is happening', function() {
      mailtoMailStatusMock.getStatus = () => 'transition';

      const element = initComponent();

      expect(element.find(`${mailSendingContainerSelector} div`).attr('openpaas-logo-spinner')).to.exist;
    });

    it('should react to mail status updated event when mail has been sent and change the status and content accordingly', function() {
      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.SENDING;

      const element = initComponent();

      $rootScope.$broadcast(MAILTO_MAIL_STATUS_EVENTS.UPDATED, MAILTO_MAIL_STATUSES.SENT);

      expect(element.find(`${mailSendingContainerSelector} div`).attr('openpaas-logo-spinner')).to.exist;

      $timeout.flush();

      expect(element.find(`${mailSendingContainerSelector} div`)[0]).to.not.exist;
      expect(element.find(`${mailSentContainerSelector} .icon-container svg title`).text()).to.contain('Mail sent');
    });

    it('should react to mail status updated event when mail failed to be sent and change the status and content accordingly', function() {
      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.SENDING;

      const element = initComponent();

      $rootScope.$broadcast(MAILTO_MAIL_STATUS_EVENTS.UPDATED, MAILTO_MAIL_STATUSES.FAILED);

      expect(element.find(`${mailSendingContainerSelector} div`).attr('openpaas-logo-spinner')).to.exist;

      $timeout.flush();

      expect(element.find(`${mailSendingContainerSelector} div`)[0]).to.not.exist;
      expect(element.find(`${mailFailedContainerSelector} .icon-container svg title`).text()).to.contain('Failed to send mail');
    });
  });

  describe('When mail has been sent', function() {
    it('should show mail sent icon when mail has been sent', function() {
      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.SENT;

      const element = initComponent();

      expect(element.find(`${mailSentContainerSelector} .icon-container svg title`).text()).to.contain('Mail sent');
    });

    it('should reopen the composer when clicking on the \'Send another\' button after the mail failed to be sent', function() {
      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.SENT;

      const element = initComponent();
      const reopenComposerButton = element.find(`${mailSentContainerSelector} button.btn.btn-primary`);

      reopenComposerButton.click();

      expect(mailtoMailComposerMock.openComposer).to.have.been.called;
    });

    it('should close the window when clicking on the \'Close window\' button after the mail failed to be sent', function() {
      $window.close = sinon.stub();
      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.SENT;

      const element = initComponent();
      const closeWindowButton = element.find(`${mailSentContainerSelector} button.btn.btn-link`);

      closeWindowButton.click();

      expect($window.close).to.have.been.called;
    });
  });

  describe('When mail failed to be sent', function() {
    it('should show mail failed icon when mail failed to be sent', function() {
      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.FAILED;

      const element = initComponent();

      expect(element.find(`${mailFailedContainerSelector} .icon-container svg title`).text()).to.contain('Failed to send mail');
    });

    it('should reopen the composer when clicking on the \'Reopen composer\' button after the mail failed to be sent', function() {
      const reopenComposer = sinon.stub();

      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.SENDING;

      const element = initComponent();

      $rootScope.$broadcast(MAILTO_MAIL_STATUS_EVENTS.UPDATED, MAILTO_MAIL_STATUSES.FAILED, { reopenComposer });
      $timeout.flush();

      const reopenComposerButton = element.find(`${mailFailedContainerSelector} button.btn.btn-primary`);

      reopenComposerButton.click();

      expect(reopenComposer).to.have.been.called;
    });

    it('should close the window when clicking on the \'Close window\' button after the mail failed to be sent', function() {
      $window.close = sinon.stub();
      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.FAILED;

      const element = initComponent();
      const closeWindowButton = element.find(`${mailFailedContainerSelector} button.btn.btn-link`);

      closeWindowButton.click();

      expect($window.close).to.have.been.called;
    });
  });

  describe('When mail is about to be discarded', function() {
    it('should show delete draft icon when the draft is about to be discarded', function() {
      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.DISCARDING;

      const element = initComponent();

      expect(element.find(`${draftContainerSelector} .icon-container svg title`).text()).to.contain('Delete draft');
    });

    it('should allow reopening the draft when clicking on the \'Reopen draft\' button', function() {
      const reopenDraft = sinon.stub();

      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.INITIAL;

      const element = initComponent();

      $rootScope.$broadcast(MAILTO_MAIL_STATUS_EVENTS.UPDATED, MAILTO_MAIL_STATUSES.DISCARDING, { reopenDraft });
      $rootScope.$digest();

      const reopenDraftButton = element.find(`${draftContainerSelector} button.btn.btn-primary`);

      reopenDraftButton.click();

      expect(element.find(`${draftContainerSelector} button.btn.btn-primary`).attr('title')).to.equal('');
      expect(reopenDraft).to.have.been.called;
    });

    it('should close the window when clicking on the \'Close window\' button', function() {
      $window.close = sinon.stub();
      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.DISCARDING;

      const element = initComponent();
      const closeWindowButton = element.find(`${draftContainerSelector} button.btn.btn-link`);

      closeWindowButton.click();

      expect($window.close).to.have.been.called;
    });
  });

  describe('When mail has been discarded', function() {
    it('should show delete draft icon when the drat has been discarded', function() {
      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.DISCARDED;

      const element = initComponent();

      expect(element.find(`${draftContainerSelector} .icon-container svg title`).text()).to.contain('Delete draft');
    });

    it('should disable the \'Reopen draft\' button and update its title', function() {
      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.DISCARDING;

      const element = initComponent();

      $rootScope.$broadcast(MAILTO_MAIL_STATUS_EVENTS.UPDATED, MAILTO_MAIL_STATUSES.DISCARDED);
      $rootScope.$digest();

      const reopenDraftButton = element.find(`${draftContainerSelector} button.btn.btn-primary`);

      expect(reopenDraftButton.attr('title')).to.equal('The draft has already been discarded');
      expect(reopenDraftButton.attr('disabled')).to.exist;
    });

    it('should close the window when clicking on the \'Close window\' button', function() {
      $window.close = sinon.stub();
      mailtoMailStatusMock.getStatus = () => MAILTO_MAIL_STATUSES.DISCARDED;

      const element = initComponent();
      const closeWindowButton = element.find(`${draftContainerSelector} button.btn.btn-link`);

      closeWindowButton.click();

      expect($window.close).to.have.been.called;
    });
  });
});
