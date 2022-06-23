const httpResponse = (message, statusCode) => {
  return `HTTP/1.1 ${statusCode} OK\r\n\r\n${message}\r\n`;
};

class Response {
  #socket;
  #statusCode;

  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  send(content) {
    this.#socket.write(httpResponse(content, this.#statusCode));
    this.#socket.end();
  }
}

module.exports = { Response };
