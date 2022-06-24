const { createServer } = require('net');
const { handleRequest } = require('./src/handler.js');
const { parseRequest } = require('./src/parseRequest.js');
const { Response } = require('./src/response.js');
const { notFoundHandler } = require('./src/notFoundHandler.js');
const { serveFileContent } = require('./src/serveFileContent.js');

const handle = (response, request) => {
  const handlers = [serveFileContent, handleRequest, notFoundHandler];
  for (const handler of handlers) {
    if (handler(response, request)) {
      return true;
    }
  }
};

const startServer = (PORT, requestHandler) => {
  const server = createServer((socket) => {

    socket.on('data', (chunk) => {
      const request = parseRequest(chunk.toString());
      console.log(request.method, request.uri);
      const response = new Response(socket);
      requestHandler(response, request);
    });
  });

  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

startServer(80, handle);
