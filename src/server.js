const response = (statusCode, message) => {
  return `HTTP/1.1 ${statusCode} OK\r\n\r\n${message}\r\n`;
};

const parseRequestLine = (line) => {
  const [method, uri, httpVersion] = line.split(' ');
  return { method, uri, httpVersion };
};

const parseHeader = (line) => {
  const indexOfSeparator = line.indexOf(':');
  const key = line.slice(0, indexOfSeparator);
  const value = line.slice(indexOfSeparator + 1);
  return [key.toLowerCase(), value];
};

const parseHeaders = (lines) => {
  const headers = {};

  let index = 0;
  while (index < lines.length && lines[index].length > 0) {
    const [header, value] = parseHeader(lines[index]);
    headers[header] = value;
    index++;
  }

  return headers;
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\r\n');
  const requestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));

  return { ...requestLine, headers };
};

const handleRequest = (socket, request) => {

  const { uri } = request;
  if (uri === '/') {
    socket.write(response(200, 'At root'));
    return;
  }

  socket.write(response(400, 'Unknown'));
};

module.exports = { parseRequest, handleRequest };
