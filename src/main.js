const decreaseButton = document.querySelector(".input--number .decrease");
const quantity = document.querySelector(".input--number .quantity");
const increaseButton = document.querySelector(".input--number .increase");

if (decreaseButton) {
  decreaseButton.addEventListener("click", () => {
    let currentyQuantity = Number(quantity.textContent);
    if (typeof currentyQuantity === "number" && currentyQuantity > 0) {
      currentyQuantity--;
      quantity.textContent = currentyQuantity;
    }
  });
}

if (increaseButton) {
  increaseButton.addEventListener("click", () => {
    let currentyQuantity = Number(quantity.textContent);
    if (typeof currentyQuantity === "number") {
      currentyQuantity++;
      quantity.textContent = currentyQuantity;
    }
  });
}
