const CustomLog = require('../../../lib/custom-log-format');

describe('lib/custom-log-format', function() {

  describe('.customLogFormat', function() {

    it('returns a log in the correct format', function() {
      const message = {
        'sessionId': '1234',
        'correlationId': 'qwer-4567-zxcv',
        'level': 'info',
        'message': 'test message',
        'timestamp': '2017-11-21T10:08:12.173Z',
      };

      const formattedMessage = CustomLog.customLogFormat(message);
      JSON.stringify(JSON.parse(formattedMessage)).should.equal(JSON.stringify({
        'sessionId': '1234',
        'correlationId': 'qwer-4567-zxcv',
        'message': 'test message',
        'timestamp': '2017-11-21T10:08:12.173Z',
        'namespace': 'status',
        'instanceId': 'instance_id',
        'subsystem': 'web-ui',
        'severity': 'info'
      }));

    });
  });

  describe('.customLogFormat_tcp', function() {

    it('returns a log in the correct format', function() {
      const level = 'info';

      const message = 'Getting status for BRP 234556788';
      const meta = {
        documentId: '234556788',
        sessionId: 'IE20JTBGYLnS1y-iCq8aozLLfSsSiyMT',
        correlationId: 'b1440383-f3c1-4b75-aca1-760607c3699a',
        timestamp: '2018-01-31T11:09:35.130Z'
      };
      const self = {};

      const formattedMessage = CustomLog.customLogFormat_tcp(level, message, meta, self);
      JSON.stringify(JSON.parse(formattedMessage)).should.equal(JSON.stringify({
        'namespace': 'status',
        'instanceId': 'instance_id',
        'subsystem': 'web-ui',
        'sessionId': 'IE20JTBGYLnS1y-iCq8aozLLfSsSiyMT',
        'correlationId': 'b1440383-f3c1-4b75-aca1-760607c3699a',
        'documentId': '234556788',
        'timestamp': '2018-01-31T11:09:35.130Z',
        'severity': 'info',
        'message': 'Getting status for BRP 234556788'
      }));

    });
  });
});
