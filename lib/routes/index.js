var servers = require('./servers');
module.exports = function routes(app) {
  app.get('/ping', function ping(req, res, next) {
    res.json({pong: true});
  });
  
  servers(app);
  
};