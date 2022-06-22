const assert = require('assert');
const { parseRequest } = require('../src/server.js');

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
