const parseRequestLine = (line) => {
  const [method, uri, httpVersion] = line.split(' ');
  return { method, uri, httpVersion };
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\r\n');
  const requestLine = parseRequestLine(lines[0]);
  const headers = {};

  return { ...requestLine, headers };
};

const handleRequest = (socket, request) => {
  const response = 'HTTP/1.1 200 OK\r\n\r\nhello\r\n';

  console.log(request);
  socket.write(response);
};

module.exports = { parseRequest, handleRequest };
