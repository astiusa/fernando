var webserver = require('./lib');

var irc = require('irc');
var repl = require('repl');
var opts = require('commander');
var request = require('request');

opts
.option('-c, --console', 'open a console for interactivity with the bot')
.option('-n, --name [name]', 'nickname')
.option('-h, --host [host]', 'IRC host to connect to')
.option('-j, --join <channels>', 'channel(s) to join on start')
.option('-o, --op <users>', 'users to give ops when they join')
.option('-p, --httpPort [port]', 'port for http server to'+
        'listen on. Defaults to 4000')
.parse(process.argv);

if (!opts.httpPort) {
  opts.httpPort = 4000;
}
webserver.init({
  port: opts.httpPort
});
webserver.start();

var nick = opts.name || 'FernandoBot';
var irchost = opts.host || 'irc.asti-usa.com';
var join = [opts.join] || ['#asti'];

var bot = new irc.Client(irchost, nick, {
  port:     6667,
  debug:    false,
  channels: join
});

// all channels in a server
function onChannels(){
  return Object.keys(bot.chans);
}
exports.onChannels = onChannels;

// all users in a channel
function inChannel(channel){
  return Object.keys(bot.chans[channel].users);
}
exports.inChannel = inChannel;

// FIXME merge channel+users list
if (opts.op) {
  for (var oper in opts.op) {
    bot.addListener('join' + join[0], function (nick, message) {
      if (nick === opts.op[oper]) {
        bot.send('mode', opts.join, '+o', nick);
      }
    });
  }
}

bot.addListener('error', function (message) {
  console.log(message);
});

// spawn a console if asked
if (opts.console) {
  var r = repl.start({
    prompt:   'bot> ',
    terminal: true
  });
}

// listen for your name
bot.addListener('pm', function (from, message) {
  console.log(from + ' => ME: ' + message);
});

bot.addListener('message', function (nick, channel, message) {
  request.post('http://localhost:4000/ping', {data: {nick: nick, message: message, channel: channel}});
});

//
