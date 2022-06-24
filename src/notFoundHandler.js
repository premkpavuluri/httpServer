const notFoundHandler = (response, request) => {
  response.statusCode = 404;
  response.send('not found');
  return true;
};

module.exports = { notFoundHandler };
