const { createServer } = require('net');
const { handleRequest } = require('./src/handler.js');
const { parseRequest } = require('./src/parseRequest.js');
const { Response } = require('./src/response.js');
const { serveFileContent } = require('./src/serveFileContent.js');

const startServer = (PORT, handler) => {
  const server = createServer((socket) => {

    socket.on('data', (chunk) => {
      const request = parseRequest(chunk.toString());
      console.log(request.method, request.uri);
      const response = new Response(socket);
      handler(response, request);
    });
  });

  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

startServer(80, handleRequest);
// startServer(80, serveFileContent);
