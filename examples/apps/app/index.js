var alexa = require('alexa-app');
var _ = require('underscore');
// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

var startConf={
  chequeAccount:{
    balance:103000,
    name:"Cheque",
    transcations:[
      5000,1000,2000
    ]
  },
  creditAccount:{
    name:"Credit",
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
  "slots": {
    'account': 'account'
  },
  "utterances": []
}, function(req, res) {
  var accountType = req.slot("account");
  if (_.isEmpty(accountType)) {
    var prompt = "Would you like to know the balance of your "+ startConf.chequeAccount.name+ " account or your " + startConf.creditAccount.name + " account?";
    var reprompt = `I didn't hear a valid account type, please try again` ;
    res.say(prompt).reprompt(reprompt).shouldEndSession(false); 
  }
});


app.intent('chequeaccountIntent', {
  "slots": { },
  "utterances": []
}, function(req, res) {
  var accountType = req.slot("account");
  res.say("Your balance is "+ startConf.chequeAccount.balance+" rand.");
});


app.intent('CreditCardIntent', {
  "slots": { },
  "utterances": []
}, function(req, res) {
  var accountType = req.slot("account");
  res.say("You owe ABSA "+ Math.abs(startConf.creditAccount.balance)+" rand.");
});



app.intent('DefaultIntent', {
  "slots": { },
  "utterances": [        "Default",
       "Dfault",
       "Dfaults",
       "Defaults",
       "Dfaultss",
       "Dfaultsss"]
}, function(req, res) {
 res.say('Please repeat what you said. I did not quiet understand');
});

app.intent("AMAZON.StopIntent", {
  "slots": {    
    "account":{
      "name": "account"
    }
  },
  "utterances": []
}, function(request, response) {
  var stopOutput = "Don't You Worry. I'll be back.";
  response.say(stopOutput);
}
);

app.intent("AMAZON.CancelIntent", {
  "slots": {},
  "utterances": []
}, function(request, response) {
  var cancelOutput = "No problem. Request cancelled.";
  response.say(cancelOutput);
});

module.exports = app;
