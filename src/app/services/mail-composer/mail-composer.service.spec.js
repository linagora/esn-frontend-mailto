'use strict';

/* global chai, sinon: false */

const expect = chai.expect;

describe('The mailtoMailComposer service', function() {
  let mailtoMailComposer, inboxMailtoParserMock, BoxOverlayStateManagerMock, newComposerServiceMock, mailtoMailStatusMock, MAILTO_MAIL_STATUSES, fakeUri;

  beforeEach(function() {
    newComposerServiceMock = {};

    inboxMailtoParserMock = sinon.stub().returnsArg(0);

    BoxOverlayStateManagerMock = {
      STATES: {
        FULL_SCREEN: 'fullscreen'
      }
    }

    mailtoMailStatusMock = {
      updateStatus: sinon.stub()
    };

    fakeUri = 'fakeUri';

    angular.mock.module('linagora.esn.unifiedinbox.mailto', function($provide) {
      $provide.factory('inboxMailtoParser', function() { return inboxMailtoParserMock; });
      $provide.factory('BoxOverlayStateManager', function() { return BoxOverlayStateManagerMock; });
      $provide.value('newComposerService', newComposerServiceMock);
      $provide.value('mailtoMailStatus', mailtoMailStatusMock);
      $provide.value('$location', {
        search: () => ({ uri: fakeUri })
      });
    });

    angular.mock.inject(function(_mailtoMailComposer_, _MAILTO_MAIL_STATUSES_) {
      mailtoMailComposer = _mailtoMailComposer_;
      MAILTO_MAIL_STATUSES = _MAILTO_MAIL_STATUSES_;
    });
  });

  describe('The openComposer method', function() {
    it('should call to inboxMailtoParser to get the message parsed from search params and open the composer with correct options', function() {
      newComposerServiceMock.open = sinon.spy(function(searchUri, options) {
        expect(searchUri).to.equal(fakeUri);
        expect(options.closeable).to.be.false;
        expect(options.allowedStates.length).to.equal(0);
        expect(options.initialState).to.equal(BoxOverlayStateManagerMock.STATES.FULL_SCREEN);

        options.onSending();
        expect(mailtoMailStatusMock.updateStatus).to.have.been.calledWith(MAILTO_MAIL_STATUSES.SENDING);

        options.onSend();
        expect(mailtoMailStatusMock.updateStatus).to.have.been.calledWith(MAILTO_MAIL_STATUSES.SENT);

        options.onFail();
        expect(mailtoMailStatusMock.updateStatus).to.have.been.calledWith(MAILTO_MAIL_STATUSES.FAILED);
      });

      mailtoMailComposer.openComposer();

      expect(inboxMailtoParserMock).to.have.been.calledWith(fakeUri);
    });
  });
});
