const service = require('./service/cronIdol');
const router = require('./router/router');
const database = require('./database/database');
const express = require('express');
const app = express();
var ref = database.ref('/Idol2');
const CronJob = require('cron').CronJob;


//config express
app.use('/',router);

app.listen(3000,()=>{
  console.log('server running on port 3000')
})

//cron job
// var job = new CronJob('* * * * * *', function() {
//     console.log('10s do one time');
//     service.idolCron(ref);
//   }, null, true);
// job.start();