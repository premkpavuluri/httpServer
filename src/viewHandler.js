const countViews = () => {
  let count = 0;
  return (response, { uri }) => {
    count++;
    if (uri === '/count') {
      response.send(`No of views:${count}`);
      return true;
    }
    return false;
  }
};

module.exports = { countViews };
