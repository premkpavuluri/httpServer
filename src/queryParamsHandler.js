const handleMaxHandler = (response, request) => {
  const { queryParams } = request;
  const { a, b } = queryParams;
  let message = 'Please provide numbers';

  if (a && b) {
    message = `Max of ${a},${b} is ${Math.max(+a, +b)}`;
  }

  response.send(message);
  return true;
};

const queryParamsHandler = (response, request) => {
  const { uri } = request;

  if (uri === '/max') {
    return handleMaxHandler(response, request);
  }
};

module.exports = { queryParamsHandler };
