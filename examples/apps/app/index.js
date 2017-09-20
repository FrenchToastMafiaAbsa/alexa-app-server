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
  
  var accountType = req.slot('account');

  if (_.isEmpty(accountType)) {
    var prompt = "Would you like to know the balance of your "+ startConf.chequeAccount.name+ " account or your " + startConf.creditAccount.name + "?";
  
    var reprompt = 'I didn\'t hear an airport code. Tell me an airport code.';
    
    res.say(prompt).reprompt(reprompt).shouldEndSession(false);
    
  }
    
  var accountType = session.get("accountScope");
  var action = session.set("balance");
  if(session.get("accountScope") == null){
    response.say("Would you like to know the balance of your "+ startConf.chequeAccount.name+ " account or your " + startConf.creditAccount.name + "?");
    response.shouldEndSession(false);
  }else{
    if(accountType=="cheque"){
      res.say('Your bank balance is '+ startConf.chequeAccount.balance+" rand");
    }else{

    }
  }

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
}
);

module.exports = app;
