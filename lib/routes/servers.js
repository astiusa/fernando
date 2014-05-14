module.exports = function(app) {
  app.get('/api/servers', function(req, res, next) {
    var servers = [
      {
        name: 'freenode',
        host: 'chat.freenode.net',
        port: 6667,
        nickname: 'fernando',
        channels: [
          '#nova.angular'
        ]
      }
    ];
    res.json(servers);
  });
}