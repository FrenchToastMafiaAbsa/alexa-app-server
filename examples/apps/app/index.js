var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;


var startConf={
  chequeAccount:{
    balance:103000,
    transcations:[
      5000,1000,2000
    ]
  },
  creditAccount:{
    balance:-90000
  }
}

var accountScope = null;


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
  res.say('Your bank balance is '+ startConf.chequeAccount.balance+" rand");
});

module.exports = app;
