
function request(options) {
  return {
    sessionModel: {
      set: sinon.stub(),
      get: sinon.stub(),
      reset: sinon.stub(),
      unset: sinon.stub(),
      toJSON: () => {
        return {};
      }
    },
    form: {
      values: {},
      options: options || {
        next: '/nextPage',
        fields: ['field']
      }
    },
    params: {},
    body: {},
    baseUrl: '/',
    originalUrl: '/page',
    translate: (key) => `translated-${key}`
  };
}

function response() {
  return {
    redirect: sinon.stub(),
    locals: {}
  };
}

module.exports = {
  req: request,
  res: response
};
