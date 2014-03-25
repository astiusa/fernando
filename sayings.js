// say something dopey
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
    'Still under development, Gary.',
    'Pipe down, coppertop.',
    "at what age is it okay to tell a highway that it's adopted?",
    "you're soaking in it",
    "My Name Is Blayze Thunderstorm and i dont care about the band Papa roach"
];
module.exports = function() {
  setInterval(function() {
    var sayit = function() {
      var saynum = Math.floor(Math.random() * (sayings.length - 1) + 1);
      if (Math.floor(Math.random() * (100) + 1) <= 10) {
        console.log("saying something " + saynum);
        //bot.say('#asti', sayings[saynum]);
        console.log("said " + sayings[saynum]);
      } else {
        console.log("not going to say anything right now.");
      }
    };
    return sayit();
  }, 5000);

}