const { createServer } = require('net');

const response = 'HTTP/1.1 200 OK\r\n\r\nhello\r\n';

const main = () => {
  const server = createServer((socket) => {
    socket.setEncoding('utf8');

    socket.on('data', (chunk) => {
      console.log(chunk);
      socket.write(response);
      socket.end();
    });
  });

  const PORT = 8888;
  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

main();
