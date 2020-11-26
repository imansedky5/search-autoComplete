const path = require('path');
const fs = require('fs');
const { cities } = require('./countries');

const handelInternalServerError = (response) => {
  response.writeHead(500, { 'Content-Type': 'text/html' });
  response.end('<h1>internal server error</h1>');
};

const sendSuccessResponse = (response, file, contentType) => {
  response.writeHead(200, { 'Content-Type': contentType });
  response.end(file);
};

const handelHome = (response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      handelInternalServerError(response);
    } else {
      sendSuccessResponse(response, file, 'text/html');
    }
  });
};

const handelAssests = (endpoint, response) => {
  const extension = path.extname(endpoint);
  const extensionType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.ico': 'image/x-icon',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
  };
  const filePath = path.join(__dirname, '..', 'public', endpoint);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      handelInternalServerError(response);
    } else {
      sendSuccessResponse(response, file, extensionType[extension]);
    }
  });
};

const handelCitiesEndPoint = (response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.end(JSON.stringify(cities));
};

module.exports = {
  handelHome, handelAssests, handelCitiesEndPoint,
};
