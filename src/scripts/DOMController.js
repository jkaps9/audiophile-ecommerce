import { CartManager } from "./cart-manager.js";

export class DOMController {
  constructor() {
    this.cartManager = new CartManager();
    this.addOnClicks();
  }

  addOnClicks() {
    this.cartButtonClick();
    this.addToCartButtonClick();
    const body = document.querySelector("body");
    this.addOnClickToNumberButtons(body);
    this.addOnClickToRemoveButton();
    this.navOnClick();
  }

  navOnClick() {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("visible");
    });
  }

  cartButtonClick() {
    const cartButton = document.querySelector(".cart");
    if (cartButton) {
      cartButton.addEventListener("click", () => {
        this.toggleCartModal();
        const cartModal = document.querySelector(".cart-modal");
        if (!cartModal.classList.contains("visually-hidden")) {
          this.updateCartItems(this.cartManager.getItems());
          this.updateCartTotal();
        }
      });
    }
  }

  toggleCartModal() {
    const cartModal = document.querySelector(".cart-modal");
    cartModal.classList.toggle("visually-hidden");

    const modalBackdrop = document.querySelector(".modal-backdrop");
    modalBackdrop.classList.toggle("visually-hidden");
  }

  updateCartItems(cartItems) {
    const cartModal = document.querySelector(".cart-modal");
    const itemList = cartModal.querySelector(".items");
    this.removeCartItems();
    const itemCount = cartModal.querySelector("h6");
    itemCount.textContent = `Cart (${cartItems.length})`;
    cartItems.forEach((cartItem) => {
      const newCartItem = this.createCartItem(
        cartItem.imageUri,
        cartItem.name,
        cartItem.name,
        cartItem.price,
        cartItem.quantity,
      );
      itemList.appendChild(newCartItem);
    });
  }

  updateCartTotal() {
    const totalAmount = document.querySelector(".total>.price");
    totalAmount.textContent = `$ ${this.cartManager.getTotal()}`;
  }

  createCartItem(imageSrc, altText, itemName, itemPrice, quantity) {
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

  removeCartItems() {
    const cartItems = document.querySelector(".cart-modal .items");
    this.removeAllChildNodes(cartItems);
  }

  // Utility Functions
  removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  addToCartButtonClick() {
    const addToCartButton = document.querySelector(".add-to-cart");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", () => {
        this.addItemToCart();
      });
    }
  }

  addItemToCart() {
    const addToCartButton = document.querySelector(".add-to-cart");
    const productId = Number(addToCartButton.getAttribute("data-product-id"));
    const productName = addToCartButton.getAttribute("data-product-name");
    const productPrice = addToCartButton.getAttribute("data-product-price");
    const productSlug = addToCartButton.getAttribute("data-product-slug");
    const quantity = Number(
      document.querySelector(".input--number>.quantity").textContent,
    );

    this.cartManager.addItem(
      productId,
      productName,
      productPrice,
      productSlug,
      quantity,
    );
  }

  addOnClickToNumberButtons(parentNode) {
    const inputNumberButtons = parentNode.querySelectorAll(".input--number");

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

  addOnClickToRemoveButton() {
    const removeAllFromCartButton = document.querySelector(
      ".cart-modal .btn--text",
    );
    if (removeAllFromCartButton) {
      // TODO: update #cart items
      // TODO: update total amount
      removeAllFromCartButton.addEventListener("click", () => {
        this.removeCartItems();
        this.cartManager.emptyCart();
        this.updateCartItems(this.cartManager.getItems());
        this.updateCartTotal();
      });
    }
  }
}
