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
  const response = 'HTTP/1.1 200 OK\r\n\r\nhello\r\n';

  console.log(request);
  socket.write(response);
};

module.exports = { parseRequest, handleRequest };
