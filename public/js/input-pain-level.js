let numberplace = document.getElementById('number');
let minusbtn = document.getElementById('minus');
let plusbtn = document.getElementById('plus');

let min = 1;
let max = 10;

minusbtn.addEventListener('click', () => {
  let number = parseInt(numberplace.value);
  if (number > min) {
    number -= 1;
    numberplace.value = number;
  }
});

plusbtn.addEventListener('click', () => {
  let number = parseInt(numberplace.value);
  if (number < max) {
    number += 1;
    numberplace.value = number;
  }
});
