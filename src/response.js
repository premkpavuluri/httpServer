const EOL = '\r\n';

const httpResponse = (statusCode) => {
  return `HTTP/1.1 ${statusCode} OK${EOL}`;
};

class Response {
  #socket;
  #statusCode;
  #headers;

  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  setHeaders(header, value) {
    this.#headers[header] = value;
  }

  #sendHeaders() {
    Object.entries(this.#headers).forEach(([header, value]) => {
      this.#socket.write(`${header}:${value}${EOL}`);
    });
  }

  send(content) {
    this.setHeaders('Content-Length', content.length);
    this.#socket.write(httpResponse(this.#statusCode));

    this.#sendHeaders();
    this.#socket.write(EOL);
    this.#socket.write(content);
    this.#socket.end();
  }
}

module.exports = { Response };
