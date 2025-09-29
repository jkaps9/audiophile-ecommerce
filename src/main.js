import { CartManager } from "./scripts/cart-manager.js";

const cartManager = new CartManager();

const cartButton = document.querySelector(".cart");
const cartModal = document.querySelector(".cart-modal");
const modalBackdrop = document.querySelector(".modal-backdrop");

const removeAllFromCartButton = document.querySelector(
  ".cart-modal .btn--text",
);

if (cartButton) {
  cartButton.addEventListener("click", () => {
    if (cartModal) {
      cartModal.classList.toggle("visually-hidden");
      modalBackdrop.classList.toggle("visually-hidden");
    }
  });
}

if (removeAllFromCartButton) {
  // TODO: update #cart items
  // TODO: update total amount
  removeAllFromCartButton.addEventListener("click", () => {
    const cartItems = document.querySelector(".cart-modal .items");
    removeAllChildNodes(cartItems);
  });
}

const inputNumberButtons = document.querySelectorAll(".input--number");

inputNumberButtons.forEach((inputNumberButton) => {
  const decreaseButton = inputNumberButton.querySelector(".decrease");
  const quantity = inputNumberButton.querySelector(".quantity");
  const increaseButton = inputNumberButton.querySelector(".increase");

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
});

// Utility Functions
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
