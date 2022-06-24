const EOL = '\r\n';

const httpResponse = (statusCode) => {
  return `HTTP/1.1 ${statusCode} OK${EOL}`;
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
    this.#socket.write(httpResponse(this.#statusCode));
    this.#socket.write(EOL);
    this.#socket.write(content);
    this.#socket.end();
  }
}

module.exports = { Response };
