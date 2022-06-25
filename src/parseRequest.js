const parseParams = (queryString) => {
  const queryParams = {};
  const params = queryString.split('&');

  params.forEach(param => {
    const [name, value] = param.split('=');
    queryParams[name] = value;
  });

  return queryParams;
};

const parseUri = (rawUri) => {
  let queryParams = {};
  const [uri, queryString] = rawUri.split('?');

  if (queryString) {
    queryParams = parseParams(queryString);
  }

  return { uri, queryParams };
};

const parseRequestLine = (line) => {
  const [method, rawUri, httpVersion] = line.split(' ');
  const { uri, queryParams } = parseUri(rawUri);
  return { method, uri, queryParams, httpVersion };
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

module.exports = { parseRequest };
