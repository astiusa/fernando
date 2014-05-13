var webserver = require('./lib');
webserver.init();
webserver.start();

var irc = require('irc');
var repl = require('repl');
var opts = require('commander');

opts
  .option('-c, --console', 'open a console for interactivity with the bot')
  .option('-n, --name [name]', 'nickname')
  .option('-h, --host [host]', 'IRC host to connect to')
  .option('-j, --join <channels>', 'channel(s) to join on start')
  .option('-o, --op <users>', 'users to give ops when they join')
  .parse(process.argv);

var nick = opts.name || 'FernandoBot';
var irchost = opts.host || 'irc.asti-usa.com';
var join = opts.join || ['#asti'];

var bot = new irc.Client(irchost, nick, {
  port:     6667,
  debug:    false,
  channels: join
});

// FIXME merge channel+users list
if (opts.op) {
  for (var oper in opts.op) {
    bot.addListener('join' + opts.join, function (nick, message) {
        if (nick === opts.op[oper]) {
          bot.send('mode', opts.join, '+o', nick);
        }
      }
    )
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