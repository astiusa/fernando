var bot = require('../bot.js');

module.exports = function(app) {
  app.get('/api/servers', getServers);
  
  app.get('/api/servers/:server/channels', getChannels);
  app.get('/api/servers/:server/channels/:channel', getChannel);
  app.get('/api/servers/:server', getServer);
};

var getServers = function getServers(req, res, next) {
  var freenode = {
    name: 'freenode',
    host: 'chat.freenode.net',
    port: 6667,
    nickname: 'fernando',
    channels: bot.getChannels()
  };
  var servers = [
    freenode
  ];
  res.json(servers);
};

var getServer = function getServer(req, res, next) {
  if (req.params.server === 'freenode') {
    var freenode = {
      name: 'freenode',
      host: 'chat.freenode.net',
      port: 6667,
      nickname: 'fernando',
      channels: bot.getChannels()
    };
    res.json(freenode);
  }
  else {
    res.send(404);
  }
};

var getChannels = function getChannels(req, res, next) {
  var server = req.params.server;
  if (server === 'freenode') {
    var channels = bot.getChannels();
    res.json(channels);
  }
  else {
    res.send(404);
  }
};

var getChannel = function getChannel(req, res, next) {
  var server = req.params.server;
  var channelName = req.params.channel;
  if (server !== 'freenode') {
    res.send(404);
  }
  var channel = bot.getChannel(channelName);
  if (channel) {
    res.json(channel);
  }
  else {
    res.send(404);
  }
};