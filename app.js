//const express = require('express');
// const exphbs = require('express-handlebars');
// const path = require('path');
// const bodyParser = require('body-parser');
// const methodOverride = require('method-override');
const redis = require('redis');

//--------- Create redis client
let client = redis.createClient();

//client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', function() {
  console.log('Connected to Redis...');
});

// ---------Start server express
//const port = 3000;
//const app = express();

//View engine
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

//Body parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

//MethodOverride
// app.use(methodOverride('_method'));

// app.get('/', function(req, res, next) {
//   res.render('searchusers');
// });

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