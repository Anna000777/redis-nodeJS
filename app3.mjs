// const express = require('express');
// const cors = require('cors');
// const exphbs = require('express-handlebars');
// const path = require('path');
// const bodyParser = require('body-parser');
// const methodOverride = require('method-override');
// const redis = require('redis');

import express from 'express';
import cors from 'cors';
import { engine } from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import { createClient } from 'redis';


//--------- Create redis client
//let client = redis.createClient();
const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));

await client.connect();
console.log('Connected to Redis...');


//client.on('error', err => console.log('Redis Client Error', err));
// client.on('connect', function() {
//   console.log('Connected to Redis...');
// });

// ---------Start server express
const port = 3000;
const app = express();

//View engine
//app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//app.use(express.static(path.join(__dirname, 'public')));

//MethodOverride
app.use(methodOverride('_method'));

//SearchPage
// app.get('/', (req, res, next) => {
//   res.render('searchusers');
// });

//Search Processing
// app.post('/user/search', (req, res, next) => {
//   let id = req.body.id;
//   client.hGetAll(id, function(err, obj){
//   if (!obj) {
//      res.render('searchusers', {
//        error: "User doesnot exist"
//      });
//   } else {
//      obj.id = id;
//      res.render('details', {
//        user: obj    
//      });
//   }
//  });
// });

//---------
//app.use(cors());
//app.use(express.json());

app.get('/message', (req, res, next) => {
   res.json({message: "Hello from server!"});
});


app.get('/', async (req,res) => {
  try {
    await client.hSet('user-session:123', {
        name: 'John',
        surname: 'Smith',
        company: 'Redis',
        age: 29
      })
    await client.hSet('user-session:124', {
      name: 'Anna',
      surname: 'Doe',
      company: 'Redis',
      age: 30
    })
    let userSession = await client.hGetAll('user-session:123'); 
    res.render('searchusers',{result: userSession});
  } catch (err) {
    console.log('Error:', err);
  }
})
// await client.hSet('user-session:123', {
//   name: 'John',
//   surname: 'Smith',
//   company: 'Redis',
//   age: 29
// })
// let userSession = await client.hGetAll('user-session:123');
//   console.log(JSON.stringify(userSession, null, 2));

//   const data = JSON.stringify(userSession, null, 2);

//--------
app.get('/pong', async (req, res) => {
  try {
    const data = await client.ping();
    res.json({Ping: data});
  } catch (err) {
    console.log('Ping error:', err);
  }
});


// await client.hDel('user-session:123', 'name');
// console.log(`deleted`);

// userSession = await client.hGetAll('user-session:123');
// console.log(JSON.stringify(userSession, null, 2));


//Start server
app.listen(port, function(){
  console.log(`Server started on port ${port}`);
});




//----------Start server default
// const http = require('http');
 
// const hostname = '127.0.0.1';
// const port = 3000;
 
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });
 
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });