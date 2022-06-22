const { createServer } = require('net');
const { parseRequest, handleRequest } = require('./src/server.js');

const main = () => {
  const server = createServer((socket) => {
    socket.setEncoding('utf8');

    socket.on('data', (chunk) => {
      const request = parseRequest(chunk);
      handleRequest(socket, request);
      socket.end();
    });
  });

  const PORT = 8888;
  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

main();
