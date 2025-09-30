import { CartManager } from "./scripts/cart-manager.js";

// init
const cartManager = new CartManager();
addOnClickToNumberButtons();
addOnClickToCartButton();
addOnClickToRemoveButton();
addOnClickToAddToCartButton();

function addOnClickToAddToCartButton() {
  const addToCartButton = document.querySelector(".add-to-cart");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      const productId = Number(addToCartButton.getAttribute("data-product-id"));
      const productName = addToCartButton.getAttribute("data-product-name");
      const productPrice = addToCartButton.getAttribute("data-product-price");
      const productSlug = addToCartButton.getAttribute("data-product-slug");
      const quantity = Number(
        document.querySelector(".input--number>.quantity").textContent,
      );
      cartManager.addItem(
        productId,
        productName,
        productPrice,
        productSlug,
        quantity,
      );
    });
  }
}

function addOnClickToCartButton() {
  const cartButton = document.querySelector(".cart");
  const cartModal = document.querySelector(".cart-modal");
  const modalBackdrop = document.querySelector(".modal-backdrop");

  if (cartButton) {
    cartButton.addEventListener("click", () => {
      if (cartModal) {
        cartModal.classList.toggle("visually-hidden");
        modalBackdrop.classList.toggle("visually-hidden");
        if (!cartModal.classList.contains("visually-hidden")) {
          const itemList = cartModal.querySelector(".items");
          removeCartItems();
          const cartItems = cartManager.getItems();
          cartItems.forEach((cartItem) => {
            const newCartItem = createCartItem(
              cartItem.imageUri,
              cartItem.name,
              cartItem.name,
              cartItem.price,
              cartItem.quantity,
            );
            itemList.appendChild(newCartItem);
          });
          addOnClickToNumberButtons();
          const totalAmount = document.querySelector(".total>.price");
          totalAmount.textContent = `$ ${cartManager.getTotal()}`;
        }
      }
    });
  }
}

function addOnClickToRemoveButton() {
  const removeAllFromCartButton = document.querySelector(
    ".cart-modal .btn--text",
  );
  if (removeAllFromCartButton) {
    // TODO: update #cart items
    // TODO: update total amount
    removeAllFromCartButton.addEventListener("click", () => {
      removeCartItems();
    });
  }
}

function addOnClickToNumberButtons() {
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
}
// Utility Functions
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function removeCartItems() {
  const cartItems = document.querySelector(".cart-modal .items");
  removeAllChildNodes(cartItems);
}

function createCartItem(imageSrc, altText, itemName, itemPrice, quantity) {
  const div = document.createElement("div");
  div.className = "item row";

  // Create image container
  const imageDiv = document.createElement("div");
  imageDiv.className = "image";
  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = altText;
  imageDiv.appendChild(img);

  // Create content container
  const contentDiv = document.createElement("div");
  contentDiv.className = "content";
  const nameP = document.createElement("p");
  nameP.className = "item-name";
  nameP.textContent = itemName;
  const priceP = document.createElement("p");
  priceP.className = "item-price";
  priceP.textContent = itemPrice;
  contentDiv.appendChild(nameP);
  contentDiv.appendChild(priceP);

  // Create number button container
  const numberButtonDiv = document.createElement("div");
  numberButtonDiv.className = "input--number";
  const decreaseBtn = document.createElement("button");
  decreaseBtn.classList.add("decrease");
  decreaseBtn.textContent = "−";
  const quantitySpan = document.createElement("span");
  quantitySpan.className = "quantity";
  quantitySpan.textContent = `${quantity}`;
  const increaseBtn = document.createElement("button");
  increaseBtn.classList.add("increase");
  increaseBtn.textContent = "+";
  numberButtonDiv.appendChild(decreaseBtn);
  numberButtonDiv.appendChild(quantitySpan);
  numberButtonDiv.appendChild(increaseBtn);

  // Append all parts to main div
  div.appendChild(imageDiv);
  div.appendChild(contentDiv);
  div.appendChild(numberButtonDiv);

  return div;
}
