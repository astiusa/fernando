var api = {};
module.exports = api;

api.ping =  function ping(req, res, next) {
  res.json({pong: true});
};