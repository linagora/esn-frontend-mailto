'use strict';

/* global chai, sinon: false */

const { expect } = chai;

describe('The mailtoMailComposer service', function() {
  let $window, $location, mailtoMailComposer, inboxMailtoParserMock, BoxOverlayStateManagerMock, newComposerServiceMock, mailtoMailStatusMock, MAILTO_MAIL_STATUSES, fakeUri, notificationFactoryMock;

  beforeEach(function() {
    notificationFactoryMock = {
      weakSuccess: sinon.stub(),
      weakError: sinon.stub()
    };

    newComposerServiceMock = {};

    inboxMailtoParserMock = sinon.stub().returnsArg(0);

    BoxOverlayStateManagerMock = {
      STATES: {
        FULL_SCREEN: 'fullscreen'
      }
    };

    mailtoMailStatusMock = {
      updateStatus: sinon.stub()
    };

    fakeUri = 'fakeUri';

    angular.mock.module('linagora.esn.unifiedinbox.mailto');

    angular.mock.module(function($provide) {
      $provide.factory('inboxMailtoParser', function() { return inboxMailtoParserMock; });
      $provide.factory('BoxOverlayStateManager', function() { return BoxOverlayStateManagerMock; });
      $provide.value('newComposerService', newComposerServiceMock);
      $provide.value('mailtoMailStatus', mailtoMailStatusMock);
      $provide.value('notificationFactory', notificationFactoryMock);
    });

    angular.mock.inject(function(_$window_, _$location_, _mailtoMailComposer_, _MAILTO_MAIL_STATUSES_) {
      $window = _$window_;
      $location = _$location_;
      mailtoMailComposer = _mailtoMailComposer_;
      MAILTO_MAIL_STATUSES = _MAILTO_MAIL_STATUSES_;

      $location.search = () => ({ uri: fakeUri });
    });
  });

  describe('The openComposer method', function() {
    const testOnSending = onSending => {
      onSending();
      expect(mailtoMailStatusMock.updateStatus).to.have.been.calledWith(MAILTO_MAIL_STATUSES.SENDING);
    };

    const testOnSend = (onSend, composerbox) => {
      onSend();
      expect(mailtoMailStatusMock.updateStatus).to.have.been.calledWith(MAILTO_MAIL_STATUSES.SENT);
      expect(composerbox.destroy).to.have.been.called;
    };

    const testOnFail = onFail => {
      const reopenComposer = () => {};

      onFail(reopenComposer);

      expect(mailtoMailStatusMock.updateStatus).to.have.been.calledWith(MAILTO_MAIL_STATUSES.FAILED, { reopenComposer });
    };

    const testOnDiscarding = onDiscarding => {
      const reopenDraft = () => {};

      onDiscarding(reopenDraft);

      expect(mailtoMailStatusMock.updateStatus).to.have.been.calledWith(MAILTO_MAIL_STATUSES.DISCARDING, { reopenDraft });
    };

    const testOnSave = onSave => {
      onSave();

      expect(notificationFactoryMock.weakSuccess).to.have.been.calledWith('Success', 'Your email has been saved');
    };

    const testOnSaveFailure = onSaveFailure => {
      onSaveFailure();

      expect(notificationFactoryMock.weakError).to.have.been.calledWith('Error', 'Can not save email');
    };

    const testOnDiscard = onDiscard => {
      $window.close = sinon.stub();
      mailtoMailStatusMock.getStatus = sinon.stub().returns(MAILTO_MAIL_STATUSES.INITIAL);

      onDiscard();

      expect(mailtoMailStatusMock.updateStatus).to.have.been.calledWith(MAILTO_MAIL_STATUSES.DISCARDED);
      expect($window.close).to.have.been.called;

      $window.close = sinon.stub();
      mailtoMailStatusMock.updateStatus = sinon.stub();
      mailtoMailStatusMock.getStatus = sinon.stub().returns(MAILTO_MAIL_STATUSES.SENT);

      onDiscard();

      expect(mailtoMailStatusMock.updateStatus).to.have.not.been.called;
      expect($window.close).to.have.not.been.called;
    };

    it('should reset the current mail status', function() {
      newComposerServiceMock.open = () => {};

      mailtoMailComposer.openComposer();

      expect(mailtoMailStatusMock.updateStatus).to.have.been.calledWith(MAILTO_MAIL_STATUSES.INITIAL);
    });

    it('should call to inboxMailtoParser to get the message parsed from search params and open the composer with correct options', function() {
      const composerbox = {
        destroy: sinon.stub()
      };

      newComposerServiceMock.open = sinon.stub().returns(composerbox);

      mailtoMailComposer.openComposer();

      expect(inboxMailtoParserMock).to.have.been.calledWith(fakeUri);
      expect(newComposerServiceMock.open).to.have.been.calledWith(fakeUri);

      const options = newComposerServiceMock.open.lastCall.lastArg;

      expect(options.closeable).to.be.false;
      expect(options.allowedStates.length).to.equal(0);
      expect(options.initialState).to.equal(BoxOverlayStateManagerMock.STATES.FULL_SCREEN);

      testOnSending(options.onSending);
      testOnSend(options.onSend, composerbox);
      testOnFail(options.onFail);
      testOnDiscarding(options.onDiscarding);
      testOnDiscard(options.onDiscard);
      testOnSaveFailure(options.onSaveFailure);
      testOnSave(options.onSave);
    });
  });
});
