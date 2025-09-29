export class Cart {
  #cartItems = [];
  constructor() {}

  addItem(cartItem) {
    this.#cartItems.push(cartItem);
  }

  getItems() {
    return [...this.#cartItems];
  }
}
