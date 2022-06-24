const fs = require('fs');

const serveFileContent = (response, { uri }) => {
  if (uri === '/') {
    uri = '/index.html';
  }

  const fileName = `./public${uri}`;

  if (!fs.existsSync(fileName)) {
    response.statusCode = 404;
    response.send('page not found');
    return;
  }

  const content = fs.readFileSync(fileName);
  response.send(content);
};

module.exports = { serveFileContent };
