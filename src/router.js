const path = require('path');
const {
  handelHome, handelAssests, handelCitiesEndPoint,
} = require('./handler');

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === '/') {
    handelHome(response);
  } else if (path.extname(endpoint)) {
    handelAssests(endpoint, response);
  } else if (endpoint === '/cities') {
    handelCitiesEndPoint(response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h1>page not found 404</h1>');
  }
};

module.exports = { router };
