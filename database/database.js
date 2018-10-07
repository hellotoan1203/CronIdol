const firebase = require("firebase");
var config = {
    apiKey: "AIzaSyBDspHqvREYQYIn3HUoWS4SyxH_hS90kKk",
    authDomain: "idoldatabase-7a541.firebaseapp.com",
    databaseURL: "https://idoldatabase-7a541.firebaseio.com",
    projectId: "idoldatabase-7a541",
    storageBucket: "idoldatabase-7a541.appspot.com",
    messagingSenderId: "932754263302"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  module.exports = database;