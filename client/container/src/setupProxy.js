/* eslint-disable no-undef */
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(CONTAINER_API, proxy({ target: CONTAINER_SERVICE_URL, changeOrigin: true }));
  app.use(AUTH_API, proxy({ target: AUTH_SERVICE_URL, changeOrigin: true }));
};
