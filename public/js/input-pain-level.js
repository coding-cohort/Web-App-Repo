let numberplace = document.getElementById('number');
let minusbtn = document.getElementById('minus');
let plusbtn = document.getElementById('plus');
let form = document.getElementById('pain_input_form');

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

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = { pain: number.value, date: new Date() };
  fetch('/pain', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => window.location.replace(res.url));
});
