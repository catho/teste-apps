const jsonServer = require('json-server');

const db = require('./src/db');
const custonRouter = require('./src/router');
const routes = require('./src/routes');

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(jsonServer.rewriter(routes));

custonRouter(server);

server.use(router);
server.listen(
  4040,
  () => {
    process.stdout.write(`Starting mock server at: http://localhost:4040/`);
  },
);
