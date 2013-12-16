var irc = require('irc');
var repl = require('repl');
var opts = require('commander');

opts.option('-c, --console').parse(process.argv);

var bot = new irc.Client('irc.asti-usa.com', 'Fernando', {
  port: 6667,
  debug: false
});

bot.addListener('motd', function(){
  bot.send('oper', 'greggt', 'roscoe123');
});

// we got ops, now grant
bot.addListener('raw', function(message){
  if (message.rawCommand === '381') {
    bot.join('#asti', function(){
      var d = new Date();
      if (d.getHours() < 12) {
        bot.say('#asti', "Good morning, meatbags.");
      }
      bot.send('mode', '#asti', '+o', 'greggt');
    });
  }
});

// this is crap
bot.addListener('join#asti', function(nick, message){
  if (nick === 'greggt') {
    bot.send('mode', '#asti', '+o', 'greggt');
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
