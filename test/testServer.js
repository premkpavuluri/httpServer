const assert = require('assert');
const { parseRequest, handleRequest } = require('../src/server.js');

describe('parseRequest', () => {
  it('Should parse the request line', () => {
    const request = 'GET / HTTP/2\r\n\r\n';
    const parsedRequest = parseRequest(request);

    const headers = {};
    const expectedReq = {
      method: 'GET', uri: '/', httpVersion: 'HTTP/2', headers
    };

    assert.deepStrictEqual(parsedRequest, expectedReq);
  });

  it('Should parse when request have headers', () => {
    const request = 'GET / HTTP/2\r\na:b\r\n\r\n';
    const parsedRequest = parseRequest(request);

    const headers = { a: 'b' };
    const expectedReq = {
      method: 'GET', uri: '/', httpVersion: 'HTTP/2', headers
    };

    assert.deepStrictEqual(parsedRequest, expectedReq);
  });
});

describe('handleRequest', () => {
  it('Should write to the socket if URI is matched', () => {
    const request = { method: 'GET', uri: '/', httpVersion: 'HTTP/1.1' };
    const logger = [];
    const mockedSocket = {
      write: (chunk) => logger.push(chunk)
    };

    const expected = ['HTTP/1.1 200 OK\r\n\r\nAt root\r\n'];
    handleRequest(mockedSocket, request);

    assert.deepStrictEqual(logger, expected);
  });

  it('Should reply with unknown if URI does not match', () => {
    const request = { method: 'GET', uri: 'hey', httpVersion: 'HTTP/1.1' };
    const logger = [];
    const mockedSocket = {
      write: (chunk) => logger.push(chunk)
    };

    const expected = ['HTTP/1.1 400 OK\r\n\r\nUnknown\r\n'];
    handleRequest(mockedSocket, request);

    assert.deepStrictEqual(logger, expected);
  });
});
