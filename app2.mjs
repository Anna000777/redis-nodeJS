import { createClient } from 'redis';
//import { showNextItem, okBtn, deleteBtn, display, counter } from './index.mjs'; 

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();
console.log('Connected to Redis...');

// await client.set('key', 'value');
// const value = await client.get('key');
// console.log(value);

await client.hSet('user-session:123', {
  name: 'John',
  surname: 'Smith',
  company: 'Redis',
  age: 29
})


let userSession = await client.hGetAll('user-session:123');
console.log(JSON.stringify(userSession, null, 2));

const data = JSON.stringify(userSession, null, 2);

await client.hDel('user-session:123', 'name');
console.log(`deleted`);

userSession = await client.hGetAll('user-session:123');
console.log(JSON.stringify(userSession, null, 2));



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


// function deleteCacheById(key) {
//   return new Promise((resv, rej) => {
//     client.del(key, (err, reply) => {
//       resv(1);
//     });
//   })
// }




await client.disconnect();
