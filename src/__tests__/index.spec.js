const { default: sentryMiddleware } = require('../index');

// mock hub
class Hub {
  constructor() {
    this.breadcrumbs = [];
  }
  addBreadcrumb = breadcrumb => {
    this.breadcrumbs.push(breadcrumb);
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  } else {
    const last = funcs[funcs.length - 1];
    const rest = funcs.slice(0, -1);
    // $FlowFixMe - Suppress error about promise not being callable
    return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args));
  }
}

describe('Sentry Middleware', () => {
  const hub = new Hub();
  const mockReq = {
    operation: {
      operationKind: 'query',
      id: 'id',
      name: 'AAAQuery',
      query: 'query {}',
      text: 'https://xxx.com/graphql',
    },
    variables: {
      filter1: 1,
    },
  };
  beforeEach(() => {
    hub.breadcrumbs = [];
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  it('request success', async () => {
    const mockRes = {
      status: 200,
    };
    const fetchSuccess = req => Promise.resolve(mockRes);

    await compose(
      sentryMiddleware({
        hub,
      }),
    )(fetchSuccess)(mockReq);

    const breadcrumb = hub.breadcrumbs.pop();
    expect(breadcrumb.category).toBe('graphql');
    expect(breadcrumb.type).toBe('http');
    expect(breadcrumb.level).toBe('info');
    expect(breadcrumb.data.url).toBe(mockReq.operation.name);
    expect(breadcrumb.data.method).toBe(mockReq.operation.operationKind);
    expect(breadcrumb.data.text).toBe(mockReq.operation.text);
    expect(breadcrumb.data.variables).toEqual(mockReq.variables);
    expect(breadcrumb.data.status_code).toBe(mockRes.status);
  });

  it('request failed', async () => {
    const mockRes = {
      status: 403,
    };

    const fetchFail = req => {
      const error = new Error('Mock Error');
      error.req = req;
      error.res = mockRes;
      throw error;
    };
    try {
      await compose(
        sentryMiddleware({
          hub,
        }),
      )(fetchFail)(mockReq);
    } catch (error) {
    } finally {
      const breadcrumb = hub.breadcrumbs.pop();
      expect(breadcrumb.level).toBe('warning');
      expect(breadcrumb.data.status_code).toBe(mockRes.status);
    }
  });

  it('no pass hub', () => {
    const excutor = () => {
      sentryMiddleware({});
    };
    expect(excutor).toThrow(Error('Sentry hub is required'));
  });
});
