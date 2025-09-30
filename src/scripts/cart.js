export class Cart {
  #cartItems = [];
  #total = 0;
  constructor() {}

  addItem(cartItem) {
    this.#cartItems.push(cartItem);
    this.setTotal();
  }

  getItems() {
    return [...this.#cartItems];
  }

  getTotal() {
    return this.#total;
  }

  setTotal() {
    this.#total = 0;
    this.#cartItems.forEach((item) => {
      const subtotal = item.price * item.quantity;
      this.#total += subtotal;
    });
  }

  emptyCart() {
    this.#cartItems = [];
    this.setTotal();
  }
}
