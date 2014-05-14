var request = require('request');
var irc = require('irc');

function bot(irchost, nick, join){
  var bot = new irc.Client(irchost, nick, {
    port:     6667,
    debug:    false,
    channels: join
  });

  // all channels in a server
  function onChannels(){
    return Object.keys(bot.chans);
  }

  // all users in a channel
  function inChannel(channel){
    return Object.keys(bot.chans[channel].users);
  }

  // op a user
  // bot.send('mode', opts.join, '+o', nick);

  bot.addListener('error', function (message) {
    console.log(message);
  });

  // listen for your name
  bot.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
  });

  bot.addListener('message', function (nick, channel, message) {
    request.post('http://localhost:4000/ping', {data: {nick: nick, message: message, channel: channel}});
  });

}
exports.bot = bot;
