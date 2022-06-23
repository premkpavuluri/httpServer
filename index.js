const { createServer } = require('net');
const { handleRequest } = require('./src/server.js');
const { parseRequest } = require('./src/parseRequest.js');

const main = (PORT, handler) => {
  const server = createServer((socket) => {
    socket.setEncoding('utf8');

    socket.on('data', (chunk) => {
      const request = parseRequest(chunk);
      console.log(request.method, request.uri);
      handler(socket, request);
      socket.end();
    });
  });

  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

main(80, handleRequest);
