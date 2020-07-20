window.onload = function () {
  let numberplace = document.getElementById("number");
  let minusbtn = document.getElementById("minus");
  let plusbtn = document.getElementById("plus");

  let min = 1;
  let max = 10;
  let number = 1;

  minusbtn.onclick = function () {
    if (number > min) {
      number = number - 1;
      numberplace.innerText = number;
    }
  };

  plusbtn.onclick = function () {
    if (number < max) {
      number += 1;
      numberplace.innerText = number;
    }
  };
};
function save() {
  console.log("value saved", number.innerHTML);
}
