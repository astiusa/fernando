var opts = require('commander');
var webserver = require('./lib');
var bot = require('./lib/bot');

opts
.option('-c, --console', 'open a console for interactivity with the bot')
.option('-n, --name [name]', 'nickname')
.option('-h, --host [host]', 'IRC host to connect to')
.option('-j, --join <channels>', 'channel(s) to join on start')
.option('-o, --op <users>', 'users to give ops when they join')
.option('-p, --httpPort [port]', 'port for http server to'+
        'listen on. Defaults to 4000')
.parse(process.argv);

var nick = opts.name || 'FernandoBot';
var irchost = opts.host || 'irc.asti-usa.com';
var join = [opts.join] || ['#asti'];

var ircbot = bot.connect(irchost, nick, join);

if (!opts.httpPort) {
  opts.httpPort = 4000;
}
webserver.init({
  port: opts.httpPort
});
webserver.start();
