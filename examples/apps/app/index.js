var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('app');
app.id = require('./package.json').alexa.applicationId;

app.launch(function(req, res) {
  res.say("Hello Hackathon");
});

app.intent('balanceIntent', {
  "slots": {},
  "utterances": []
}, function(req, res) {
  res.say('Fuck you divar');
});

module.exports = app;
