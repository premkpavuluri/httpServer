const html = (body) => `<html><body>${body}</body></html>`;

const response = (message, statusCode = 200) => {
  return `HTTP/1.1 ${statusCode} OK\r\n\r\n${message}\r\n`;
};

const handleRequest = (socket, request) => {

  const { uri } = request;
  if (uri === '/') {
    socket.write(response(html('Hello world')));
    return;
  }

  socket.write(response(html('Unknown'), 400));
};

module.exports = { handleRequest };
