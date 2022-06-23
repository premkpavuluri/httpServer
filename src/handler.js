const html = (body) => `<html><body>${body}</body></html>`;

const handleRequest = (response, request) => {

  const { uri } = request;
  if (uri === '/') {
    response.send(html('Hello world'));
    return;
  }

  if (uri === '/prem') {
    response.send(html('Hey Prem‸'));
    return;
  }

  response.statusCode = 404;
  response.send(html('Unknown'), 400);
};

module.exports = { handleRequest };
