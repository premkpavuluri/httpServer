const { createServer } = require('net');
const { handleRequest } = require('./src/handler.js');
const { parseRequest } = require('./src/parseRequest.js');
const { Response } = require('./src/response.js');
const { notFoundHandler } = require('./src/notFoundHandler.js');
const { serveFileContent } = require('./src/serveFileContent.js');
const { countViews } = require('./src/viewHandler.js');

const handle = (handlers) => {
  return (response, request) => {
    return handlers.some(handler => handler(response, request));
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

const handlers = [countViews(), serveFileContent, handleRequest, notFoundHandler];

startServer(80, handle(handlers));
