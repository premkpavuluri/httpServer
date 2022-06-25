const { createServer } = require('net');
const { handleRequest } = require('./src/handler.js');
const { parseRequest } = require('./src/parseRequest.js');
const { Response } = require('./src/response.js');
const { notFoundHandler } = require('./src/notFoundHandler.js');
const { serveFileContent } = require('./src/serveFileContent.js');
const { countViews } = require('./src/viewHandler.js');
const { handleRedirect } = require('./src/handleRedirection.js');

const handle = (handlers) => {
  return (response, request, path) => {
    return handlers.some(handler => handler(response, request, path));
  }
};

const startServer = (PORT, requestHandler, path) => {
  const server = createServer((socket) => {

    socket.on('data', (chunk) => {
      const request = parseRequest(chunk.toString());
      console.log(request.method, request.uri);
      const response = new Response(socket);
      requestHandler(response, request, path);
    });
  });

  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

// const handlers = [countViews(), serveFileContent, handleRequest, notFoundHandler];
const handlers = [handleRedirect, handleRequest, notFoundHandler];

startServer(80, handle(handlers), process.argv.slice(2)[0]);
