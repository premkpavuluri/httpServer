const html = (body) => `<html><body>${body}</body></html>`;

const httpResponse = (message, statusCode = 200) => {
  return `HTTP/1.1 ${statusCode} OK\r\n\r\n${message}\r\n`;
};

const handleRequest = (response, request) => {

  const { uri } = request;
  if (uri === '/') {
    response.send(httpResponse(html('Hello world')));
    return;
  }

  response.send(httpResponse(html('Unknown'), 400));
};

module.exports = { handleRequest };
