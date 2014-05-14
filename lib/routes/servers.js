var freenode = {
  name: 'freenode',
  host: 'chat.freenode.net',
  port: 6667,
  nickname: 'fernando',
  channels: [
    '#nova.angular'
  ]
};

var novaangular = {
  name: '#nova.angular',
  server: 'freenode',
  users: [
    {
      nick: 'rossk',
      ip: '192.168.1.1',
    },
    {
      nick: 'greggt',
      ip: '192.168.1.2'
    }
  ]
};

module.exports = function(app) {
  app.get('/api/servers', getServers);
  
  app.get('/api/servers/:server/:channel', getChannel);
  app.get('/api/servers/:server', getServer);
};

var getServers = function getServers(req, res, next) {
  var servers = [
    freenode
  ];
  res.json(servers);
};

var getServer = function getServer(req, res, next) {
  if (req.params.server === 'freenode') {
    res.json(freenode);
  }
  else {
    res.send(404);
  }
};

var getChannel = function getChannel(req, res, next) {
  var server = req.params.server;
  var channel = req.params.channel;
  if (server !== 'freenode' || channel !== '#nova.angular') {
    res.send(404);
  }
  else {
    res.json(novaangular);
  }

};