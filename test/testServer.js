const assert = require('assert');
const { handleRequest } = require('../src/handler.js');

describe('handleRequest', () => {
  it('Should write to the socket if URI is matched', () => {
    const request = { method: 'GET', uri: '/', httpVersion: 'HTTP/1.1' };
    const expectedContent = '<html><body>Hello world</body></html>';
    let actualResponse;
    const mockedSocket = {
      send: (chunk) => actualResponse = chunk
    };

    handleRequest(mockedSocket, request);
    assert.deepStrictEqual(actualResponse, expectedContent)
  });

  it('Should reply with unknown if URI does not match', () => {
    const request = { method: 'GET', uri: 'hey', httpVersion: 'HTTP/1.1' };
    const expectedContent = '<html><body>Unknown</body></html>';
    let actualResponse;
    const mockedSocket = {
      send: (chunk) => actualResponse = chunk
    };

    handleRequest(mockedSocket, request);
    assert.deepStrictEqual(actualResponse, expectedContent)
  });
});
