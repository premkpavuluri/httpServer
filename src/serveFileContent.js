const fs = require('fs');

const MIMETYPES = {
  'png': 'image/png',
  'html': 'text/html'
}

const determineMimeType = (fileName) => {
  const fileType = fileName.slice(fileName.lastIndexOf('.') + 1);
  return MIMETYPES[fileType];
};

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

  response.setHeaders('Content-Type', determineMimeType(fileName));
  const content = fs.readFileSync(fileName);
  response.send(content);
};

module.exports = { serveFileContent };
