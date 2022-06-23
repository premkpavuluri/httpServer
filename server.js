const { createServer } = require('net');
const { handleRequest } = require('./src/handler.js');
const { parseRequest } = require('./src/parseRequest.js');
const { Response } = require('./src/response.js');

const main = (PORT, handler) => {
  const server = createServer((socket) => {
    socket.setEncoding('utf8');

    socket.on('data', (chunk) => {
      const request = parseRequest(chunk);
      console.log(request.method, request.uri);
      const response = new Response(socket);
      handler(response, request);
      socket.end();
    });
  });

  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

main(80, handleRequest);
