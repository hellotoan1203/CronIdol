const express = require('express');
const database = require('../database/database');
const request = require("request-promise");
const cheerio = require("cheerio");
var router = express.Router();
var ref = database.ref('/Idol2');

router.get('/',(req,res)=>{
    res.status(200);
    res.send("sever is listening.....")
    res.end();
})

router.get('/idols',(req,res)=>{
    if(req.query.limit != undefined){
        start = parseInt(req.query.limit);
        ref.limitToFirst(start).once('value',snap=>{
            data = [];
            i=0;
            snap.forEach((value) => {
                data.push({id: i++, name: value.val().name});
            });
            res.send(data);
            res.end();
        })
    }else{
        ref.limitToFirst(50).once('value',snap=>{
            data = [];
            i=0;
            snap.forEach((value) => {
                data.push({id: i++, name: value.val().name});
            });
            res.send(data);
            res.end();
        })
    }
})


router.get('/idols/all',(req,res)=>{
    ref.once('value',snap=>{
        data = [];
        i=0;
        snap.forEach(value=>{
            i++;
            data.push({id: i++,name: value.val().name});
        })
        res.send(data);
        res.end();
    })
})


router.get('/idols/:name',(req,res)=>{
    ref.once('value',snap=>{
       ArrayValue = [] 
       snap.forEach(snapChild=>{
            if(ArrayValue.indexOf(snapChild.val().name)===-1){
                ArrayValue.push(snapChild.val().name);
            }
       })
       ArrayValue.forEach( value=>{
               if(req.params.name === value){
               request("https://javmodel.com/jav/"+req.params.name)
               .then(body=>{
                   $ = cheerio.load(body);
                   a =[]
                   $('div.col-sm-4 > ul > li').children().each((i,e)=>{
                       a.push(e.next.data);
                   })
                   res.send(a);
                   res.end()  
               })
           }  
       }

       )
    })
})



module.exports = router;