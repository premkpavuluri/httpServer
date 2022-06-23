const fs = require('fs');

const serveFileContent = (response, { uri }) => {
  if (uri === '/') {
    uri = '/index.html';
  }

  const fileName = `./public${uri}`;

  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName);
    response.send(content);
    return;
  }
};

module.exports = { serveFileContent };
