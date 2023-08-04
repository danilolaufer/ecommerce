const express = require("express")
const fs = require("fs");
const { uuidv4 } = require("uuid");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async loadDB() {
    if (fs.existsSync(this.path)) {
      const productsString = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(productsString);
      this.products = products;
    }
  }

  async getProducts() {
    try {
      await this.loadDB();
      return this.products;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const productById = products.find((prod) => prod.id == id);
      return productById ? productById : "Product not found";
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(product) {
    try {
      const { title, description, code, price, stock, category, thumbnails, status } = product;
      const products = await this.getProducts();
      if (!title || !description || !code || !price || !stock || !category) {
        return "All fields are required";
      }
      if (products.some((prod) => prod.code == code)) {
        return "Invalid product duplicate code";
      }
      this.products.push({
        id: uuidv4(),
        status: status || true,
        thumbnails: thumbnails || [],
        ...product,
      });
      const productsString = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, productsString);
      return "Product added successfully";
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, product) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((prod) => prod.id == id);
      if (productIndex === -1) {
        return "Product not found";
      }
      if (product.id) {
        return "Cannot modify id field";
      }
      this.products[productIndex] = { ...this.products[productIndex], ...product };
      const productsString = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, productsString);
      return "Product updated successfully";
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((prod) => prod.id == id);
      if (productIndex === -1) {
        return "Product not found";
      }
      this.products.splice(productIndex, 1);
      const productsString = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, productsString);
      return "Product deleted successfully";
    } catch (error) {
      console.log(error);
    }
  }
}
//No hay que instanciar la clase aca, se instancia en el archivo que se ocupe
//const productManager = new ProductManager("src/db/products.json");
//Exportar ProductManager 
module.exports = {
  ProductManager
};
