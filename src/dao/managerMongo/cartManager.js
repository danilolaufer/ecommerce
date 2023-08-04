const  CartModel = require("../models/cart")
const { ProductModel } = require("../models/product");


class CartManagerMongo {

  async addCart() {
    try{
      const newCart = await CartModel.create({ products: [] });
      console.log(newCart)
      return newCart
  } catch (error) {
      console.log(error)
  }
  }

  async getCarts() {
    try {
      const carts = await CartModel.find({}).populate("products:product");
      if (carts) {
        return carts;
      } else {
        return `Failed to get Carts`;
      }
     
  } catch (error) {
      console.log(error)
  }
  }

  async getCartId(cartId) {
    try {
      const cart = await CartModel.find({ _id: cartId });
      if (cart) {
        return cart;
      } else {
        return `Failed to get Cart, Cart ${cartId} was not found`;
      }
     
  } catch (error) {
      console.log(error)
  }
  
  }

  async addProductsToCarts(cid, prodId) {
    try {
      const cart = await CartModel.findById(cid);
      console.log(cart.products)
      const product = await ProductModel.findById(prodId);
      if (!cart) {
        throw new Error("Cart does not exist");
      }
      if (!product) {
        throw new Error("Product does not exist");
      }
      const prodInCart = cart.products.find(p=>product.equals(prodId))
 
      if(prodInCart){
        prodInCart.quantity++
      }else{
        cart.products.push({ product: product._id, quantity: 1 });
      }
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error)}
  
 
  }

  async deleteCartById(_id) {
    try {
      // Buscar el carrito por su ID
      const cart = await CartModel.findOne({ _id });
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      // Eliminar todos los productos del carrito
      cart.products = [];
      // Guardar los cambios en la base de datos
      await cart.save();
    } catch (error) {
      console.log(error);
    }
  }


async deleteProductInCart(cartId, productId) {
  try {
      const cart = await CartModel.findById(cartId);
      const filteredProducts = cart.products.filter(product =>toString(product._id)  !== toString(productId) );
      cart.products = filteredProducts;
      cart.save();
      return cart
  } catch (error) {
      console.log(error)
  }
}
async replaceProductsInCart(cartId, products) {
  try {
      const cart = await CartModel.findById(cartId);
      cart.products = products;
      cart.save();
      return cart
  } catch (error) {
      console.log(error)
  }
}

async updateProductInCart(cartId, productId, quantity) {
  try {
      const cart = await CartModel.findById(cartId); 
      const product = cart.products.find(product => toString(product._id)  == toString(productId));
      product.quantity = quantity;
      cart.save();
      return cart
  } catch (error) {
      console.log(error)
  }
}
}
module.exports = {
  CartManagerMongo,
};







