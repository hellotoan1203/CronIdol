const service = require('./service/cronIdol');
const firebase = require("firebase");
var CronJob = require('cron').CronJob;
var config = {
    apiKey: "AIzaSyBDspHqvREYQYIn3HUoWS4SyxH_hS90kKk",
    authDomain: "idoldatabase-7a541.firebaseapp.com",
    databaseURL: "https://idoldatabase-7a541.firebaseio.com",
    projectId: "idoldatabase-7a541",
    storageBucket: "idoldatabase-7a541.appspot.com",
    messagingSenderId: "932754263302"
  };
  
  firebase.initializeApp(config);
  ref = firebase.database().ref('/Idol2');
  
var job = new CronJob('10 * * * * *', function() {
    console.log('10s do one time');
    service.idolCron(ref);
  }, null, true);
job.start();