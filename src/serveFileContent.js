const fs = require('fs');

const MIMETYPES = {
  'png': 'image/png',
  'html': 'text/html'
}

const determineMimeType = (fileName) => {
  const fileType = fileName.slice(fileName.lastIndexOf('.') + 1);
  return MIMETYPES[fileType];
};

const serveFileContent = (response, { uri }, path) => {
  if (uri === '/') {
    uri = '/index.html';
  }

  const fileName = `${path}${uri}`;

  if (!fs.existsSync(fileName)) {
    return false;
  }

  response.setHeaders('Content-Type', determineMimeType(fileName));
  fs.readFile(fileName, (err, data) => response.send(data));

  return true;
};

module.exports = { serveFileContent };
