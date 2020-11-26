const http = require('http');
const { router } = require('./router');

const server = http.createServer(router);
const port = process.env.PORT || 4000;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('hello from port 4000');
});
