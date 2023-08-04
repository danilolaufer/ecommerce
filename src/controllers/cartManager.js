const express = require("express")
const fs = require("fs");
const { ProductManager } = require("./productManager");
const uuid4 = require("uuid4");

const productManager = new ProductManager("src/db/products.json");

// if (!fs.existsSync("../db/carts.json")) {
//   fs.writeFileSync("../db/carts.json", "[]");
// }

class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
  }

  async loadCarts() {
    try {
      if (!fs.existsSync(this.path)) {
          fs.writeFileSync(this.path, "[]");
        }
      this.carts = JSON.parse(fs.readFileSync(this.path));
    } catch (error) {
      console.log("Error carts loaded", error);
    }
  }

  async updateCarts() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.log("Error carts loaded", error);
    }
  }

  async addCart() {
    await this.loadCarts();
    const id = uuid4();
    this.carts.push({
      id: id,
      products: []
    });
    await this.updateCarts();
  }

  async getCarts() {
    await this.loadCarts();
    if (this.carts) {
      return this.carts;
    } else {
      console.log("Cart not found");
    }
  }

  async getCartId(cid) {
    await this.loadCarts();
    const cartExist = this.carts.find(cart => cart.id == cid);
    if (cartExist) {
      return cartExist;
    } else {
      return `Failed to get Cart, Cart ${cid} was not found`;
    }
  }

  async addProductsToCarts(cid, id) {
    await this.loadCarts();
    const indexCart = this.carts.findIndex(cart => cart.id == cid);
    const cartExist = this.carts.find(cart => cart.id == cid);
    const productExist = await productManager.getProductById(id);
    if (indexCart === -1) {
      return "Cart does not exist";
    } else if (productExist === "Product not found") {
      return "Product does not exist";
    } else {
      const productInCart = this.carts[indexCart].products.findIndex(prod => prod.idProduct == id);
      if (productInCart === -1) {
        this.carts[indexCart].products.push({
          idProduct: id,
          quantity: 1
        });
        await this.updateCarts();
      } else {
        this.carts[indexCart].products[productInCart].quantity++;
        await this.updateCarts();
      }
    }
  }

  async deleteCartById(id) {
    try {
      await this.loadCarts();
      let cartIndex = this.carts.findIndex(prod => prod.id == id);
      if (cartIndex === -1) {
        return "Cart not found";
      }
      this.carts.splice(cartIndex, 1);
      const productsString = JSON.stringify(this.carts, null, 2);
      await fs.promises.writeFile(this.path, productsString);
      return "Cart deleted successfully";
    } catch (error) {
      console.log(error);
    }
  }
}
//No hay que instanciar la clase aca, se instancia en el archivo que se ocupe
//const cart = new CartManager("carts.json");

//exportar CartManager
module.exports = {
  CartManager,
};
