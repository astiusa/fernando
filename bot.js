var irc = require('irc');
var repl = require('repl');
var opts = require('commander');

opts.option('-c, --console').parse(process.argv);

var sayings = [
    'do you sell hubcaps for a 1972 pinto?',
    'bring me a tangerine',
    'Good morning, meatbags.',
    'open GLITTER VALVE to maximum',
    'Mi papa tiene 47 anos',
    'butts butts butts #butts',
    'HEADBANGER!',
    'he dominates the DECADENT SUBWAY SCENE.',
    'Science!',
    'Pipe down, coppertop.',
    "at what age is it okay to tell a highway that it's adopted?",
    "you're soaking in it",
    "My Name Is Blayze Thunderstorm and i dont care about the band Papa roach"
];

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
    })
  }
});

// this is crap
bot.addListener('join#asti', function(nick, message){
    if (nick === 'greggt') {
        bot.send('mode', '#asti', '+o', 'greggt');
    }
})

bot.addListener('error', function(message){
  console.log(message)
})

// spawn a console if asked
if (opts.console) {
    var r = repl.start();
    r.context.bot = bot;
}

// say something dopey
setTimeout(function () {
  var saynum = Math.random() * (sayings.length - 1) + 1;
  if (Date.now() % 15 == 10) {
    bot.say('#asti', sayings[saynum]);
  }
}, 5000);
