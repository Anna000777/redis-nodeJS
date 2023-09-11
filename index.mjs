//import { createClient } from 'redis';

const okBtn = document.getElementById('ok');
const deleteBtn = document.getElementById('del');
const display = document.getElementById('display');

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

console.log('hello');





