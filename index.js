const TOTAL_CART_ITEMS = document.getElementById("total-cart-items");
const DISPLAY_CART_ITEMS = document.getElementById("display-cart-items");
const TOTAL_PRICE = document.getElementById("total-price");
// 1. Create an object class for the product to store the prorperties for id, name and price of the product

// Product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
// *******

// 2. Create an object class for the shopping cart item to store the properties of the products and its quantity

// A sub class of the product
class ProductInfo extends Product {
  constructor(id, name, price, quantity) {
    super(id, name, price);
    this.quantity = quantity;
  }
  // 3. To the preceding class add a method to calculate the total price of the item
  calculateProductTotal() {
    return this.price * this.quantity;
  }
}
// *******

// 4. Create another object class for the shopping cart which contains an array of ShoppingCartItems
class ShoppingCartItems {
  constructor(cartItems) {
    this.cartItems = cartItems;
  }
  // 5. Create the following methods

  //  i. get total items in cart
  getNumberOfItemsInCart() {
    TOTAL_CART_ITEMS.innerText = `items: ${this.cartItems.length}`;
  }

  // ii. increasing quantity of items
  increaseQuantity(productId) {
    this.cartItems.forEach((item) => {
      if (item.id === productId) {
        item.quantity += 1;
      }
      this.displayCartItems();
      this.calculateTotalOfItemsInCart();
    });
  }

  // iii. decreasing quantity of items
  decreaseQuantity(productId) {
    this.cartItems.forEach((item) => {
      if (item.id === productId && item.quantity > 1) {
        item.quantity -= 1;
      }
      this.displayCartItems();
      this.calculateTotalOfItemsInCart();
    });
  }

  //   iv. A method to get total amount of everything in cart
  calculateTotalOfItemsInCart() {
    let total = 0;
    this.cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });
    TOTAL_PRICE.innerText = total;
  }

  // v. A method for removing items from cart
  removeCartItem(productId) {
    let updatedCartItem = this.cartItems.filter(
      (item) => item.id !== productId
    );
    this.cartItems = updatedCartItem;
    this.displayCartItems();
    this.getNumberOfItemsInCart();
    this.calculateTotalOfItemsInCart();
  }

  // vi. A method to display all cart items
  displayCartItems() {
    let products = this.cartItems.map((item) => {
      return `  <div class="product-card flex gap-10 items-center mb-5 border-b-2 pb-2">
          <h2 class="text-gray-500 font-bold text-2xl">${item.name}</h2>
          <h3 class="font-semibold text-xl">
            <span class="font-normal text-xs">price. </span>${item.price}
          </h3>
          <div>
            <button id=${item.id}
              class="decrease-btn bg-black rounded-md px-4 py-2 text-white"
            >
              -
            </button>
            <p class="pl-1 font-bold">
              <span class="text-xs font-light">qty. </span>${item.quantity}</p>
            <button id=${item.id}
              class="bg-black rounded-md px-4 py-2 text-white increase-btn"
            >
              +
            </button>
          </div>
          <p class="font-bold">
            <span class="font-light text-xs">sub total: </span>${item.calculateProductTotal()}</p>
          <button id=${item.id}
            class="delete-btn border-b-2 bg-slate-50 rounded-md my-8 px-5 py-2"
          >
            delete
          </button>
        </div>`;
    });
    DISPLAY_CART_ITEMS.innerHTML = products.join(" ");

    // get all the buttons for decreasing
    const decreaseBTN = document.querySelectorAll(".decrease-btn");
    decreaseBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.decreaseQuantity(parseInt(e.target.getAttribute("id")));
      });
    });
    // get all the buttons for increasing
    const increaseBTN = document.querySelectorAll(".increase-btn");
    increaseBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.increaseQuantity(parseInt(e.target.getAttribute("id")));
      });
    });
    // get all the buttons for deleting
    const deleteBTN = document.querySelectorAll(".delete-btn");
    deleteBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.removeCartItem(parseInt(e.target.getAttribute("id")));
      });
    });
  }
}
// ******

// Our cart items
let cartItems = [
  new ProductInfo(1, "11 pro max", 10000, 1),
  new ProductInfo(2, "12 pro max", 20000, 1),
  new ProductInfo(3, "13 pro max", 30000, 1),
];

// create an instance of the shopping cart
const shoppingCart = new ShoppingCartItems(cartItems);

// display all the cart items
shoppingCart.displayCartItems();
shoppingCart.getNumberOfItemsInCart();
shoppingCart.calculateTotalOfItemsInCart();
shoppingCart.getNumberOfItemsInCart();
