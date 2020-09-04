'use strict';

/* global chai, sinon: false */

const { expect } = chai;

describe('The mailtoCloseWindowService service', function() {
  let $window, $rootScope, mailtoCloseWindowService, mailtoMailStatusMock, MAILTO_MAIL_STATUSES, INBOX_EVENTS;

  beforeEach(function() {
    mailtoMailStatusMock = {
      getStatus: sinon.stub()
    };

    angular.mock.module('linagora.esn.unifiedinbox.mailto');

    angular.mock.module(function($provide) {
      $provide.value('mailtoMailStatus', mailtoMailStatusMock);
    });

    angular.mock.inject(function(_mailtoCloseWindowService_, _$window_, _$rootScope_, _mailtoMailComposer_, _MAILTO_MAIL_STATUSES_, _INBOX_EVENTS_) {
      mailtoCloseWindowService = _mailtoCloseWindowService_;
      $rootScope = _$rootScope_;
      $window = _$window_;
      MAILTO_MAIL_STATUSES = _MAILTO_MAIL_STATUSES_;
      INBOX_EVENTS = _INBOX_EVENTS_;
    });
  });

  describe('The setup method', function() {
    it('should register the onbeforeload handler', function() {
      mailtoCloseWindowService.setup();

      expect(window.onbeforeunload).to.be.a.function;
    });

    describe('The onbeforeunload handler', function() {
      it('should return when mailto status is not INITIAL', function() {
        const emitSpy = sinon.spy($rootScope, '$emit');
        const event = {
          preventDefault: sinon.spy()
        };

        mailtoMailStatusMock.getStatus.returns(MAILTO_MAIL_STATUSES.SENT);

        mailtoCloseWindowService.setup();

        const result = $window.onbeforeunload(event);

        expect(event.preventDefault).to.have.been.calledOnce;
        expect(result).to.be.empty;
        expect(emitSpy).to.not.have.been.called;
      });

      it('should return when mailto status is INITIAL', function() {
        const emitSpy = sinon.spy($rootScope, '$emit');
        const event = {
          preventDefault: sinon.spy()
        };

        mailtoMailStatusMock.getStatus.returns(MAILTO_MAIL_STATUSES.INITIAL);

        mailtoCloseWindowService.setup();

        const result = $window.onbeforeunload(event);

        expect(event.preventDefault).to.have.been.calledOnce;
        expect(result).to.match(/Are you sure you want to leave?/);
        expect(event.returnValue).to.match(/Are you sure you want to leave?/);
        expect(emitSpy).to.have.been.calledWith(INBOX_EVENTS.CLOSE_COMPOSER_WARNING);
      });
    });
  });
});
