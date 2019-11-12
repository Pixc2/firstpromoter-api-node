const FirstpromoterApiNode = require('../firstpromoter-api-node');

describe('Constructor', () => {
  test('create instance', () => {
    const firstpromoterApiNode = new FirstpromoterApiNode();
    expect(firstpromoterApiNode).toBeInstanceOf(FirstpromoterApiNode);
  });

  test('set base URL from env', () => {
    process.env.FIRSTPROMOTER_API_NODE_BASE_URL = 'http://localhost';
    const firstpromoterApiNode = new FirstpromoterApiNode();
    expect(firstpromoterApiNode.baseUrl).toBe('http://localhost');
  });

  test('set base URL from constant', () => {
    delete process.env.FIRSTPROMOTER_API_NODE_BASE_URL;
    const firstpromoterApiNode = new FirstpromoterApiNode();
    expect(firstpromoterApiNode.baseUrl).toBe('https://firstpromoter.com/api/v1');
  });

  test('set wid from env', () => {
    process.env.FIRSTPROMOTER_API_NODE_WID = 'test';
    const firstpromoterApiNode = new FirstpromoterApiNode({
      wid: 'other',
    });
    expect(firstpromoterApiNode.wid).toBe('test');
  });

  test('set wid from options', () => {
    delete process.env.FIRSTPROMOTER_API_NODE_WID;
    const firstpromoterApiNode = new FirstpromoterApiNode({
      wid: 'test',
    });
    expect(firstpromoterApiNode.wid).toBe('test');
  });

  test('set key from env', () => {
    process.env.FIRSTPROMOTER_API_NODE_KEY = 'test';
    const firstpromoterApiNode = new FirstpromoterApiNode({
      key: 'other',
    });
    expect(firstpromoterApiNode.key).toBe('test');
  });

  test('set key from options', () => {
    delete process.env.FIRSTPROMOTER_API_NODE_KEY;
    const firstpromoterApiNode = new FirstpromoterApiNode({
      key: 'test',
    });
    expect(firstpromoterApiNode.key).toBe('test');
  });

  test('save promise of request lib', () => {
    const firstpromoterApiNode = new FirstpromoterApiNode();
    expect(firstpromoterApiNode.request).toBeInstanceOf(Function);
  });
});

describe('Method: setWid', () => {
  let firstpromoterApiNode;

  beforeEach(() => {
    firstpromoterApiNode = new FirstpromoterApiNode();
  });

  test('set wid', () => {
    firstpromoterApiNode.setWid('test');
    expect(firstpromoterApiNode.wid).toBe('test');
  });
});

describe('Method: setKey', () => {
  let firstpromoterApiNode;

  beforeEach(() => {
    firstpromoterApiNode = new FirstpromoterApiNode();
  });

  test('set key', () => {
    firstpromoterApiNode.setKey('test');
    expect(firstpromoterApiNode.key).toBe('test');
  });
});

describe('Method: get', () => {
  let firstpromoterApiNode;

  beforeEach(() => {
    firstpromoterApiNode = new FirstpromoterApiNode();
    firstpromoterApiNode.execute = jest.fn();
  });

  test('call execute', () => {
    firstpromoterApiNode.get('path', { foo: 'fighters' });
    expect(firstpromoterApiNode.execute).toBeCalledWith({
      path: 'path',
      method: 'get',
      qs: { foo: 'fighters' },
    });
  });

  test('call execute (no params)', () => {
    firstpromoterApiNode.get('path');
    expect(firstpromoterApiNode.execute).toBeCalledWith({
      path: 'path',
      method: 'get',
      qs: {},
    });
  });
});

describe('Method: post', () => {
  let firstpromoterApiNode;

  beforeEach(() => {
    firstpromoterApiNode = new FirstpromoterApiNode();
    firstpromoterApiNode.execute = jest.fn();
  });

  test('call execute', () => {
    firstpromoterApiNode.post('path', { foo: 'fighters' });
    expect(firstpromoterApiNode.execute).toBeCalledWith({
      path: 'path',
      method: 'post',
      json: { foo: 'fighters' },
    });
  });
});

describe('Method: put', () => {
  let firstpromoterApiNode;

  beforeEach(() => {
    firstpromoterApiNode = new FirstpromoterApiNode();
    firstpromoterApiNode.execute = jest.fn();
  });

  test('call execute', () => {
    firstpromoterApiNode.put('path', { foo: 'fighters' });
    expect(firstpromoterApiNode.execute).toBeCalledWith({
      path: 'path',
      method: 'put',
      json: { foo: 'fighters' },
    });
  });
});

describe('Method: remove', () => {
  let firstpromoterApiNode;

  beforeEach(() => {
    firstpromoterApiNode = new FirstpromoterApiNode();
    firstpromoterApiNode.execute = jest.fn();
  });

  test('call execute', () => {
    firstpromoterApiNode.remove('path', { foo: 'fighters' });
    expect(firstpromoterApiNode.execute).toBeCalledWith({
      path: 'path',
      method: 'delete',
      json: { foo: 'fighters' },
    });
  });
});

describe('Method: execute', () => {
  let firstpromoterApiNode;

  beforeEach(() => {
    firstpromoterApiNode = new FirstpromoterApiNode({
      wid: 'wid',
      key: 'key',
    });
  });

  test('make successfull request', async () => {
    let resolve;
    firstpromoterApiNode.request = jest.fn(
      () => new Promise((theResolve) => { resolve = theResolve; }),
    );
    setTimeout(() => resolve({ body: { data: 'test' }, statusCode: 200 }));
    const result = await firstpromoterApiNode.execute({});
    expect(result).toEqual({ body: { data: 'test' }, statusCode: 200 });
  });

  test('make successfull request (with json)', async () => {
    let resolve;
    firstpromoterApiNode.request = jest.fn(
      () => new Promise((theResolve) => { resolve = theResolve; }),
    );
    setTimeout(() => resolve({ body: { data: 'test' }, statusCode: 200 }));
    firstpromoterApiNode.key = 'test key';
    const result = await firstpromoterApiNode.execute({ path: 'test', json: true });
    expect(firstpromoterApiNode.request).toBeCalledWith({
      url: 'https://firstpromoter.com/api/v1/test',
      json: true,
      headers: { 'x-api-key': 'test key' },
    });
    expect(result).toEqual({ body: { data: 'test' }, statusCode: 200 });
  });

  test('make successfull request (with ip)', async () => {
    let resolve;
    firstpromoterApiNode.request = jest.fn(
      () => new Promise((theResolve) => { resolve = theResolve; }),
    );
    setTimeout(() => resolve({ body: { data: 'test' }, statusCode: 200 }));
    firstpromoterApiNode.key = 'test key';
    const result = await firstpromoterApiNode.execute({ path: 'track/signup', json: { ip: '8.8.8.8' } });
    expect(firstpromoterApiNode.request).toBeCalledWith({
      url: 'https://firstpromoter.com/api/v1/track/signup',
      json: { ip: '8.8.8.8', wid: 'wid' },
      headers: { 'x-api-key': 'test key' },
    });
    expect(result).toEqual({ body: { data: 'test' }, statusCode: 200 });
  });

  test('make successfull request (without ip)', async () => {
    let resolve;
    firstpromoterApiNode.request = jest.fn(
      () => new Promise((theResolve) => { resolve = theResolve; }),
    );
    setTimeout(() => resolve({ body: { data: 'test' }, statusCode: 200 }));
    firstpromoterApiNode.key = 'test key';
    const result = await firstpromoterApiNode.execute({ path: 'track/signup', json: {} });
    expect(firstpromoterApiNode.request).toBeCalledWith({
      url: 'https://firstpromoter.com/api/v1/track/signup',
      json: { wid: 'wid', ip: expect.anything() },
      headers: { 'x-api-key': 'test key' },
    });
    expect(result).toEqual({ body: { data: 'test' }, statusCode: 200 });
  });

  test('make successfull request (with no_ip)', async () => {
    let resolve;
    firstpromoterApiNode.request = jest.fn(
      () => new Promise((theResolve) => { resolve = theResolve; }),
    );
    setTimeout(() => resolve({ body: { data: 'test' }, statusCode: 200 }));
    firstpromoterApiNode.key = 'test key';
    const result = await firstpromoterApiNode.execute({ path: 'track/signup', json: { ip: 'NO_IP' } });
    expect(firstpromoterApiNode.request).toBeCalledWith({
      url: 'https://firstpromoter.com/api/v1/track/signup',
      json: { wid: 'wid' },
      headers: { 'x-api-key': 'test key' },
    });
    expect(result).toEqual({ body: { data: 'test' }, statusCode: 200 });
  });

  test('make failed request', async () => {
    let reject;
    firstpromoterApiNode.request = jest.fn(
      () => new Promise((_, theReject) => { reject = theReject; }),
    );
    setTimeout(() => reject('test'));
    try {
      await firstpromoterApiNode.execute({});
    } catch (err) {
      expect(err).toEqual('test');
    }
  });
});

describe('Method: processResponse', () => {
  test('process success case', () => {
    const success = jest.fn();
    FirstpromoterApiNode.processResponse(
      { body: { data: 'test' }, statusCode: 200 },
      success,
    );
    expect(success).toBeCalledWith({ body: { data: 'test' }, statusCode: 200 });
  });

  test('process failure case', () => {
    const failure = jest.fn();
    FirstpromoterApiNode.processResponse(
      { body: { message: 'test' }, statusCode: 404 },
      null,
      failure,
    );
    expect(failure).toBeCalledWith({ message: 'test' });
  });

  test('process failure case (no error)', () => {
    const failure = jest.fn();
    FirstpromoterApiNode.processResponse(
      { body: undefined, statusCode: 404 },
      null,
      failure,
    );
    expect(failure).toBeCalledWith({ message: 'API Error' });
  });
});
