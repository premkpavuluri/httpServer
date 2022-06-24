const html = (body) => `<html><body><h1>${body}</h1></body></html>`;

let pageHits = 0;

const handleRequest = (response, request) => {

  const { uri } = request;
  if (uri === '/') {
    response.send(html('Hello world'));
    return;
  }

  if (uri === '/prem') {
    response.send(html('Hey Prem'));
    return;
  }

  if (uri === '/views') {
    pageHits++;
    response.send(html(`No of hits: ${pageHits}`));
    return;
  }

  response.statusCode = 404;
  response.send(html('Unknown'));
};

module.exports = { handleRequest };
