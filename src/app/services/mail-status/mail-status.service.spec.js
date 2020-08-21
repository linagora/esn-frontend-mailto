'use strict';

/* global chai, sinon: false */

const expect = chai.expect;

describe('The mailtoMailStatus service', function() {
  let $rootScope, $log, mailtoMailStatus, MAILTO_MAIL_STATUSES, MAILTO_MAIL_STATUS_EVENTS;

  beforeEach(function() {
    angular.mock.module('linagora.esn.unifiedinbox.mailto');

    angular.mock.inject(function(_$rootScope_, _$log_, _mailtoMailStatus_, _MAILTO_MAIL_STATUSES_, _MAILTO_MAIL_STATUS_EVENTS_) {
      $rootScope = _$rootScope_;
      $log = _$log_;
      mailtoMailStatus = _mailtoMailStatus_;
      MAILTO_MAIL_STATUSES = _MAILTO_MAIL_STATUSES_;
      MAILTO_MAIL_STATUS_EVENTS = _MAILTO_MAIL_STATUS_EVENTS_;

      $rootScope.$broadcast = sinon.stub();
      $log.error = sinon.stub();
    })
  });

  describe('The initial status', function() {
    it('should be MAILTO_MAIL_STATUSES.INITIAL', function() {
      const currentStatus = mailtoMailStatus.getStatus();

      expect(currentStatus).to.equal(MAILTO_MAIL_STATUSES.INITIAL);
    });
  });

  describe('The getStatus method', function() {
    it('should return the current status', function() {
      let currentStatus = mailtoMailStatus.getStatus();

      expect(currentStatus).to.equal(MAILTO_MAIL_STATUSES.INITIAL);

      mailtoMailStatus.updateStatus(MAILTO_MAIL_STATUSES.SENDING);

      currentStatus = mailtoMailStatus.getStatus();

      expect(currentStatus).to.equal(MAILTO_MAIL_STATUSES.SENDING);
    });
  });

  describe('The updateStatus method', function() {
    it('should update the current status if the incoming new status is valid and broadcast an event with the updated status', function() {
      mailtoMailStatus.updateStatus(MAILTO_MAIL_STATUSES.SENDING);

      const currentStatus = mailtoMailStatus.getStatus();

      expect(currentStatus).to.equal(MAILTO_MAIL_STATUSES.SENDING);
      expect($rootScope.$broadcast).to.have.been.calledWith(MAILTO_MAIL_STATUS_EVENTS.UPDATED, MAILTO_MAIL_STATUSES.SENDING);
    });

    it('should neither update the current status nor broadcast an event if the incoming new status is invalid, but log an error', function() {
      const previousStatus = mailtoMailStatus.getStatus();
      const newStatus = MAILTO_MAIL_STATUSES.SENDING + 'some_invalid_string_123abc!@#$$^(*)21';

      mailtoMailStatus.updateStatus(MAILTO_MAIL_STATUSES.SENDING + 'some_invalid_string_123abc!@#$$^(*)21');

      const currentStatus = mailtoMailStatus.getStatus();

      expect(previousStatus).to.equal(currentStatus);
      expect($rootScope.$broadcast).to.not.have.been.called;
      expect($log.error).to.have.been.calledWith(`Cannot update the mail status since the mail status '${newStatus}' is not allowed.`);
    });
  });
});
