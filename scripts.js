var max;
var min;
var acualValue;

function initComponents() {
  let rootBox = document.getElementById("root");
  let initContainer = document.createElement("div");
  initContainer.setAttribute("id", "init-container");
  initContainer.setAttribute("data-showed", "true");
  rootBox.appendChild(initContainer);
  let form = document.createElement("form");
  form.onsubmit = validateEnteredNumber;
  initContainer.appendChild(form);
  let textFeild = document.createElement("label");
  textFeild.setAttribute("class", "text-feild");
  textFeild.setAttribute("for", "number-feild");

  textFeild.innerHTML = "Please enter a number";
  form.appendChild(textFeild);
  let numberField = document.createElement("input");
  numberField.setAttribute("id", "number-feild");
  numberField.setAttribute("type", "number");
  numberField.setAttribute("min", "1");
  numberField.setAttribute("max", "100");
  form.appendChild(numberField);
  let nextBtn = document.createElement("input");
  nextBtn.setAttribute("class", "next-btn");
  nextBtn.setAttribute("type", "submit");
  nextBtn.setAttribute("value", "Next-->");
  form.appendChild(nextBtn);

  return false;
}

function validateEnteredNumber() {
  console.log("Here");
  let value = document.getElementById("number-feild").value;
  if (value !== "") {
    acualValue = value;
    setUpPlayComponents();
  } else {
    document.getElementById("number-feild").style.border = "1px solid red";
  }
  return false;
}

function setUpPlayComponents() {
  max = 100;
  min = 1;
  var rootBox = document.getElementById("root");
  document.getElementById("init-container").setAttribute("data-showed", "false");
  console.log("Here");
  let centeredBox = document.createElement("div");
  centeredBox.setAttribute("class", "centered-box");
  rootBox.appendChild(centeredBox);
  let currentNumberContainer = document.createElement("div");
  currentNumberContainer.setAttribute("id", "current-number");
  currentNumberContainer.innerHTML = Math.floor(Math.random() * 100) + 1;
  centeredBox.appendChild(currentNumberContainer);
  ////////////////////////////////////////////////// here add arrows container
  let arrowsContainer = document.createElement("div");
  arrowsContainer.setAttribute("class", "arrows-container");
  centeredBox.appendChild(arrowsContainer);
  ////////////////////////////////////////////////// here add arrowUp
  let arrowUpContainer = document.createElement("div");
  arrowUpContainer.setAttribute("class", "arrow");
  arrowUpContainer.onclick = function () {
    let preValue = parseInt(
      document.getElementById("current-number").innerHTML
    );
    min = preValue + 1;
    appendListNumbers(preValue);
  };
  arrowsContainer.appendChild(arrowUpContainer);
  let arrowUp = document.createElement("i");
  arrowUp.setAttribute("class", "icon fas fa-arrow-up");
  arrowUpContainer.appendChild(arrowUp);
  ////////////////////////////////////////////////// here add equal sign
  let equalContainer = document.createElement("div");
  equalContainer.setAttribute("class", "arrow");
  equalContainer.onclick = function () {
    let expectedValue = parseInt(
      document.getElementById("current-number").innerHTML
    );
    validateEquality(expectedValue);
  };
  arrowsContainer.appendChild(equalContainer);
  let equal = document.createElement("i");
  equal.setAttribute("class", "icon las la-equals");
  equalContainer.appendChild(equal);
  ////////////////////////////////////////////////// here add arrowDown
  let arrowDownContainer = document.createElement("div");
  arrowDownContainer.setAttribute("class", "arrow");
  arrowDownContainer.onclick = function () {
    let preValue = parseInt(
      document.getElementById("current-number").innerHTML
    );
    max = preValue - 1;
    appendListNumbers(preValue);
  };
  arrowsContainer.appendChild(arrowDownContainer);
  let arrowDown = document.createElement("i");
  arrowDown.setAttribute("class", "icon fas fa-arrow-down");
  arrowDownContainer.appendChild(arrowDown);
  ///////////////////////////////////////////////// here add items container
  let itemContainer = document.createElement("div");
  itemContainer.setAttribute("class", "item-container");
  centeredBox.appendChild(itemContainer);
}

function genarateExpectedNumber() {
  let expectedNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  document.getElementById("current-number").innerHTML = expectedNumber;
  validateRange();
}

function validateEquality(expectedNumber) {
  if (expectedNumber == acualValue) {
  /*   Swal.fire({
      title: "Good job!",
      text: "You get the true number!",
      icon: "success",
      willClose: closeMsg,
    }); */
    alert("You get the true number!");
    closeMsg();
    document.getElementsByClassName("centered-box")[0].style.display = "none";
  } else {
    document.getElementsByClassName("centered-box")[0].style.display = "none";
    /* Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "you have fail!",
      willClose: closeMsg,
    }); */
    alert("you have fail");
    closeMsg();
    const myNode = document.getElementsByClassName("item-container")[0];
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
  }
}

function validateRange() {
  if (max == min || acualValue > max || acualValue < min) {
    document.getElementsByClassName("centered-box")[0].style.display = "none";
    /* Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "you have fail!",
      willClose: closeMsg,
    }); */
    alert("you have fail!");
    closeMsg();
    const myNode = document.getElementsByClassName("item-container")[0];
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
  }
}

function appendListNumbers(value) {
  itemContainer = document.getElementsByClassName("item-container")[0];
  let item = document.createElement("div");
  item.setAttribute("class", "item");
  item.innerHTML = value;
  itemContainer.appendChild(item);
  genarateExpectedNumber();
}

function closeMsg() {
  const myNode = document.getElementById("root");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  initComponents();
}
