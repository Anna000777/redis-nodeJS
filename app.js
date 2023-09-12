const express = require('express');
const cors = require('cors');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

//--------- Create redis client
let client = redis.createClient();

//client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', function() {
  console.log('Connected to Redis...');
});

// ---------Start server express
const port = 3000;
const app = express();

//View engine
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

//MethodOverride
app.use(methodOverride('_method'));

//SearchPage
app.get('/', (req, res, next) => {
  res.render('searchusers');
});

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

// app.get('/', (req, res, next) => {
//    res.json({message: "Hello from server!"});
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