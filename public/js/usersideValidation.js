let flag1 = false;
let flag2 = false;
let flag3 = false;
let flag4 = false;
//validation for email
function validation() {
  var form = document.getElementById('form');
  var email = document.getElementById('email').value;
  var text = document.getElementById('text');
  var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (email.match(pattern)) {
    form.classList.add('valid');
    form.classList.remove('invalid');
    form.classList.remove('mark1');
    text.innerHTML = 'Your Email address is Valid';
    text.style.color = '#00ff00';
  } else {
    form.classList.remove('valid');
    form.classList.add('invalid');
    form.classList.remove('mark1');

    text.innerHTML = 'Your Email address is Invalid';
    text.style.color = '#ff0000';
    flag1 = true;
  }
  if (email == '') {
    form.classList.remove('valid');
    form.classList.remove('invalid');
    form.classList.add('mark1');
    text.innerHTML = 'This Field cannot be Empty';
    text.style.color = 'yellow';
  }
}

//validation for name
function validation1() {
  var form = document.getElementById('form');
  var name = document.getElementById('name').value;
  console.log(form, name);
  var text1 = document.getElementById('text1');

  if (name.length < 4) {
    form.classList.add('invalid1');
    form.classList.remove('valid1');
    form.classList.remove('mark');
    text1.innerHTML = 'Your Name is Invalid';
    text1.style.color = '#ff0000';
  } else {
    form.classList.add('valid1');
    form.classList.remove('invalid1');
    form.classList.remove('mark');
    text1.innerHTML = 'Your Name is Valid';
    text1.style.color = '#00ff00';
    flag2 = true;
  }
  if (name == '') {
    form.classList.remove('valid1');
    form.classList.remove('invalid1');
    form.classList.add('mark');
    text1.innerHTML = 'This Field cannot be Empty';
    text1.style.color = 'yellow';
  }
}

//validation for surname
function validation2() {
  var form = document.getElementById('form');
  var surname = document.getElementById('surname').value;
  var text2 = document.getElementById('text2');

  if (surname.length < 4) {
    form.classList.add('invalid2');
    form.classList.remove('valid2');
    form.classList.remove('mark2');
    text2.innerHTML = 'Your Surname is Invalid';
    text2.style.color = '#ff0000';
  } else {
    form.classList.add('valid2');
    form.classList.remove('invalid2');
    form.classList.remove('mark2');
    text2.innerHTML = 'Your Surname is Valid';
    text2.style.color = '#00ff00';
    flag3 = true;
  }
  if (surname == '') {
    form.classList.remove('valid2');
    form.classList.remove('invalid2');
    form.classList.add('mark2');
    text2.innerHTML = 'This Field cannot be Empty';
    text2.style.color = 'yellow';
  }
}

//validtion for password
function validation3() {
  var form = document.getElementById('form');
  var password = document.getElementById('password').value;
  var text3 = document.getElementById('text3');
  console.log(password.length);

  if (password.length < 7) {
    form.classList.remove('valid3');
    form.classList.add('invalid3');
    form.classList.remove('mark3');
    text3.innerHTML = 'Password must be 7 or above characters';
    text3.style.color = '#ff0000';
  } else {
    form.classList.remove('invalid3');
    form.classList.add('valid3');
    form.classList.remove('mark3');
    text3.innerHTML = 'Your Password is Valid';
    text3.style.color = '#00ff00';
    flag4 = true;
  }
  if (password == '') {
    form.classList.remove('invalid3');
    form.classList.remove('valid3');
    form.classList.add('mark3');
    text3.innerHTML = 'This Field cannot be Empty';
    text3.style.color = 'yellow';
  }
}

//validtion for password
function validation4() {
  var form = document.getElementById('form');
  var password = document.getElementById('password').value;
  var conpassword = document.getElementById('conpassword').value;
  var text4 = document.getElementById('text4');

  if (conpassword !== password) {
    form.classList.remove('valid3');
    form.classList.add('invalid3');
    form.classList.remove('mark3');
    text4.innerHTML = 'Confirm password must be same as password.';
    text4.style.color = '#ff0000';
  } else {
    form.classList.remove('invalid3');
    form.classList.add('valid3');
    form.classList.remove('mark3');
    text4.innerHTML = 'Your Password is Valid';
    text4.style.color = '#00ff00';
    flag4 = true;
  }
  if (conpassword == '') {
    form.classList.remove('invalid3');
    form.classList.remove('valid3');
    form.classList.add('mark3');
    text4.innerHTML = 'This Field cannot be Empty';
    text4.style.color = 'yellow';
  }
}
