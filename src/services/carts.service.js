const { CartMethods } = require("../dao/factory.js");
const { ProductService } = require("../services/products.service.js");
const { TicketService } = require("./tickets.service.js");
const { UserService } = require("./users.service.js");

const productService = new ProductService();
const ticketService = new TicketService();
const userSevice = new UserService();

class CartService {

  async getAll() {
    try {
      const carts = await CartMethods.find();
      return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async addCart() {
    try {
      let newCart = await CartMethods.create({ products: [] });
      console.log('Cart was created successfully');
      return newCart;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getCartById(_id) {
    try {
      const cart = await CartMethods.findPopulatedOne(_id);
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteCart(_id) {
    try {
      await CartMethods.updateOne(_id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async addProductToCart(productId, cartId) {
    try {
      let carts = await this.getAll();
      let checkCId = carts.find((cId) => cId._id.equals(cartId));
      if (!checkCId) {
        throw new Error("Invalid id, cart not found");
      }
      let cart = await CartMethods.findOne(cartId);
      let existingProduct = cart.products.find((pId) => pId.idProduct.equals(productId));

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ idProduct: productId, quantity: 1 });
      }

      await cart.save();

      console.log(`Product ${productId} was added successfully to cart ${cartId}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProductFromCart(productId, cartId) {
    try {
      let carts = await this.getAll();
      let checkCId = carts.find((cId) => cId._id.equals(cartId));
      if (!checkCId) {
        throw new Error("Invalid id, cart not found");
      }
      let cart = await CartMethods.findOne(cartId);
      let existingProduct = cart.products.find((pId) => pId.idProduct.equals(productId));
      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          cart.products.splice(cart.products.indexOf(existingProduct), 1);
        } else {
          existingProduct.quantity -= 1;
        }
      } else {
        throw new Error(`Product with id: ${productId} was not found in the cart with id:${cartId}`);
      }
      await cart.save();
      console.log(`Product ${productId} was deleted successfully from cart ${cartId}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCart(cartId, productId, cartByUser) {
    try {
      if (productId === null) {
        let cart = await CartMethods.findOne(cartId);
        let newCart = cart.products = cartByUser.products;
        await cart.save();
        console.log(`The products of cart with id:${cartId} was updated successfully`);
        return newCart;
      } else {
        let cart = await CartMethods.findOne(cartId);
        let existingProduct = cart.products.find((pId) => pId.idProduct.equals(productId));
        if (existingProduct) {
          existingProduct.quantity = cartByUser.quantity;
        } else {
          throw new Error(`Product with id: ${productId} was not found in the cart with id:${cartId}`);
        }
        await cart.save();
        return cart;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProductsCart(cartId, arrayproductId) {
    try {
      let cart = await CartMethods.updateProducts(cartId, arrayproductId);
      console.log(`The products of cart with id:${cartId} was updated successfully`);
      return cart;
    } catch (error) {
      console.log("---------------------------------", error);
      throw new Error(error.message);
    }
  }

  async purchase(cartId, user) {
    try {
      let cart = await CartMethods.findOne(cartId);
      if (cart) {
        const productIds = cart.products.map(product => product.idProduct.toString());
        const productsQuantity = cart.products.map(quan => quan.quantity);
        const productsData = await productService.getArrProductsData(productIds);
        let amount = 0;
        let prodOutStock = [];
        let prodStock = [];

        productsData.map((prod, index) => {
          if (productsQuantity[index] > prod.stock) {
            prodOutStock.push({
              idProduct: prod._id,
              quantity: productsQuantity[index]
            });
          } else {
            let newStock = prod.stock - (productsQuantity[index]);
            let priceProduct = prod.price * (productsQuantity[index]);
            amount += priceProduct;
            prodStock.push({
              idProduct: prod._id,
              stock: newStock
            });
          }
        });

        const ticket = await ticketService.createTicket({
          amount,
          purchaser: user
        });

        return {
          ticket,
          prodStock,
          prodOutStock
        };
      } else {
        throw new Error('That cart doesnt exist');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPurchase() {
    try {
      const tickets = await ticketService.getTickets();
      return tickets;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deletePurchase() {
    try {
      const tickets = await ticketService.deletePurchase();
      return tickets;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = { cartService };
