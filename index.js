//import { createClient } from 'redis';

const okBtn = document.getElementById('ok');
const deleteBtn = document.getElementById('del');
const display = document.getElementById('display');

//const client = createClient();
  //createClient({
  // url: 'redis://alice:foobared@awesome.redis.server:6380'
  //});

//client.on('error', err => console.log('Redis Client Error', err));

//await client.connect();

//await client.set('key', 'value');
//const value = await client.get('key');

//const data = await client.hGetAll('key'); //обєкт значень з redis

// Object.entries(data).forEach(([key, value]) => {
//   console.log(`${key} ${value}`);
// });


//await client.disconnect();

let counter = -1;

const data = {
  name : "anna",
  surname: "doe",
  age: "23",
  street: "Street 67",
}

okBtn.addEventListener('click', function() {
  display.innerText = '';
  counter++;
  showNextItem(counter);
  console.log('ok clicked');
});

deleteBtn.addEventListener('click', () => {
  deleteCacheById();
});

function showNextItem(counter) {
  const objData = Object.entries(data);
  for (let i=0; i<objData.length; i++) {
    if (counter <= i) {
      [key, value] = objData[counter];
      display.innerText = `${key} : ${value}`;
    } else {
      display.innerText = 'The End';
    }
  }
}

// function deleteCacheById(key) {
//   return new Promise((resv, rej) => {
//     client.del(key, (err, reply) => {
//       resv(1);
//     });
//   })
// }
console.log('hello');