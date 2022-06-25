const handlePermanentRedirect = (response, request) => {
  response.statusCode = 301;
  response.setHeaders('Location', '/');
  response.send('Redirected to home page');
  return true;
};

const handleTemporaryRedirect = (response, request) => {
  response.statusCode = 302;
  response.setHeaders('Location', '/prem');
  response.send('Redirected to prem page');
  return true;
};

const handleRedirect = (response, request) => {
  const { uri } = request;
  if (uri === '/predirect') {
    return handlePermanentRedirect(response, request);
  }

  if (uri === '/tredirect') {
    return handleTemporaryRedirect(response, request);
  }
};

module.exports = { handleRedirect };
