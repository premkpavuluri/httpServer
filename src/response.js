const EOL = '\r\n';

const statusMessage = {
  200: 'OK',
  404: 'Not Found',
  301: 'Permanent Redirect',
  302: 'Temporary Redirect'
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

  #getStatusLine() {
    const message = statusMessage[this.#statusCode];
    return `HTTP/1.1 ${this.#statusCode} ${message}${EOL}`;
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
    this.#socket.write(this.#getStatusLine());

    this.#sendHeaders();
    this.#socket.write(EOL);
    this.#socket.write(content);
    this.#socket.end();
  }
}

module.exports = { Response };
