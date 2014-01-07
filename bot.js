var irc = require('irc');
var repl = require('repl');
var opts = require('commander');
var say = require('./sayings');

opts.option('-c, --console').parse(process.argv);

var bot = new irc.Client('irc.labs.asti-usa.com', 'Fernando', {
  port: 6667,
  debug: false
});

bot.addListener('motd', function(){
  bot.send('oper', 'Fernando', 'roscoe123');
});

// we got ops, now grant
bot.addListener('raw', function(message){
  if (message.rawCommand === '381') {
    bot.join('#asti-labs', function(){
      say(bot);
      var d = new Date();
      if (d.getHours() < 12) {
        bot.say('#asti-labs', "Good morning, meatbags.");
      }
      bot.send('mode', '#asti-labs', '+o', 'rossk');
    });
  }
});

// this is crap
bot.addListener('join#asti-labs', function(nick, message){
  if (nick === 'Fernando') {
    bot.send('mode', '#asti-labs', '+o', 'rossk');
  }
});

bot.addListener('message#asti-labs', function(nick, text, message) {
  console.log(text);
  if (text === 'Dance, Fernando') {
    bot.say('#asti-labs', '┗(-_-)┛┏(-_-)┓┗(-_-)┛');
  }
});

bot.addListener('error', function(message){
  console.log(message);
});

// spawn a console if asked
if (opts.console) {
  var r = repl.start();
  r.context.bot = bot;
}

// listen for your name
bot.addListener('pm', function(from, message){
  console.log(from + ' => ME: ' + message);
});
