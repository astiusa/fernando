var freenode = {
  name: 'freenode',
  host: 'chat.freenode.net',
  port: 6667,
  nickname: 'fernando',
  channels: [
    '#nova.angular'
  ]
};

module.exports = function(app) {
  app.get('/api/servers', function(req, res, next) {
    var servers = [
      freenode
    ];
    res.json(servers);
  });
  
  app.get('/api/servers/:server', function(req, res, next) {
    if (req.params.server === 'freenode') {
      res.json(freenode);
    }
    else {
      res.send(404);
    }
  });
}