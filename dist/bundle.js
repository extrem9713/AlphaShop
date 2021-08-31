(()=>{"use strict";console.log("JS loaded!")})();

const btnControl = document.getElementById("btn-control");
const stepControl = document.getElementById("step-control");
const steps = stepControl.querySelectorAll(".step-part");
const form = document.getElementById("a-form");
const formParts = form.querySelectorAll(".part");
const nextBtn = btnControl.querySelector(".btn-primary");
const prevBtn = btnControl.querySelector(".btn-outline");
const shoppingList = document.querySelector(".shoppimg-list");
const itemCost = document.querySelectorAll(".item-cost");
const itemNum = document.querySelectorAll(".item-num");
const Sum = document.querySelector(".sum-cost");
const fee = document.querySelector(".fee-cost");
const deliveryPanel = document.querySelector("#delivery");

let step = 0;


function handleBtnControlClicked(e) {
  e.preventDefault();
  const nowStep = steps[step];

  if (e.target.matches(".btn-primary") && e.target.innerHTML !== "確認下單") {
    const nextStep = steps[step + 1];
    nowStep.classList.remove("active");

    nowStep.classList.add("checked");
    nextStep.classList.add("active");
    formParts[step].classList.toggle("d-none");
    formParts[step + 1].classList.toggle("d-none");
    step += 1;
  } else if (e.target.matches(".btn-outline")) {
    const prevStep = steps[step - 1];
    nowStep.classList.remove("active");
    prevStep.classList.remove("checked");
    prevStep.classList.add("active");
    formParts[step].classList.toggle("d-none");
    formParts[step - 1].classList.toggle("d-none");
    step -= 1;
  }
  setBtnDisabled();
}

function setBtnDisabled() {
  if (step === 0) {
    prevBtn.classList.add("d-none");
    prevBtn.innerHTML = "";
    prevBtn.setAttribute("disabled", "disabled");
  } else {
    prevBtn.classList.remove("d-none");
    prevBtn.removeAttribute("disabled");
    prevBtn.innerHTML = "&#8592上一步";
  }
  if (step === 2) {
    nextBtn.innerHTML = "確認下單";
  } else {
    nextBtn.innerHTML = "下一步&#8594";
  }
}


function itemCountControl(e) {
  const add = e.target.parentElement.children[1];
  const num = Number.parseInt(add.innerHTML);
  if (e.target.matches(".add-circle")) {
    add.innerHTML = num + 1;
  } else if (e.target.matches(".reduce-circle") && num !== 0) {
    add.innerHTML = num - 1;
  }
  itemCount(add);
}


function itemCount(e) {
  itemCost[0].innerHTML = 3999 * Number.parseInt(itemNum[0].innerHTML);
  itemCost[1].innerHTML = 1299 * Number.parseInt(itemNum[1].innerHTML);
  let sum =
    Number.parseInt(itemCost[0].innerHTML) +
    Number.parseInt(itemCost[1].innerHTML);
  if (fee.innerHTML === "500") {
    sum += 500;
  }
  Sum.innerHTML = sum;
}


function feeCost(e) {
  if (e.target.matches(".free") && fee.innerHTML === "500") {
    fee.innerHTML = "免費";
  } else if (e.target.matches(".fee")) {
    fee.innerHTML = "500";
  }
  itemCount();
}

btnControl.addEventListener("click", handleBtnControlClicked);

shoppingList.addEventListener("click", itemCountControl);

deliveryPanel.addEventListener("click", feeCost);
