import { CartItem } from "./cart-item.js";
import { Cart } from "./cart.js";

export class CartManager {
  constructor() {
    this.cart = new Cart();
  }

  addItem(product, quantity) {
    const imageUri = `/assets/cart/${product.slug}.jpg`;
    const newItem = new CartItem(
      product.others.name,
      product.price,
      quantity,
      imageUri,
    );
    this.cart.addItem(newItem);
  }
}
