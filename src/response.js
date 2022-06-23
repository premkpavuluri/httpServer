class Response {
  #socket;

  constructor(socket) {
    this.#socket = socket;
  }

  send(content) {
    this.#socket.write(content);
  }
}

module.exports = { Response };
