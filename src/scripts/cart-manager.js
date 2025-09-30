import { CartItem } from "./cart-item.js";
import { Cart } from "./cart.js";

export class CartManager {
  constructor() {
    this.cart = new Cart();
  }

  addItem(id, name, price, slug, quantity) {
    const imageUri = `/assets/cart/image-${slug}.jpg`;
    const newItem = new CartItem(id, name, price, quantity, imageUri);
    this.cart.addItem(newItem);
  }

  getItems() {
    return this.cart.getItems();
  }

  getTotal() {
    return this.cart.getTotal();
  }
}
