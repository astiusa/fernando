var request = require('request');
var irc = require('irc');

var ircbot = {};
module.exports = ircbot;

ircbot.connect = function connect(irchost, nick, join){
  this.bot = new irc.Client(irchost, nick, {
    port:     6667,
    debug:    false,
    channels: join
  });

  // op a user
  // bot.send('mode', opts.join, '+o', nick);

  this.bot.addListener('error', function (message) {
    console.log(message);
  });

  // listen for your name
  this.bot.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
  });

  // send every message on the channel to an endpoint
  this.bot.addListener('message', function (nick, channel, message) {
    request.post('http://localhost:4000/ping', {data: {nick: nick, message: message, channel: channel}});
  });
};

// all channels in a server
ircbot.onChannels = function(){
  return Object.keys(this.bot.chans);
};

// all users in a channel
ircbot.inChannel = function(channel){
  return Object.keys(this.bot.chans[channel].users);
};
