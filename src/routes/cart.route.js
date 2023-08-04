const { Router } = require("express");

const cartsRouter = Router();
// const { CartManager } = require("../controllers/cartManager");
// const cartManager = new CartManager("src/db/carts.json");

const { CartManagerMongo}  = require("../dao/managerMongo/cartManager")
const cartManager = new CartManagerMongo();

cartsRouter.post("/", async (req, res) => {
  try {
    const addCart = await cartManager.addCart();

    addCart
      ? res.status(400).json({
          status: "error",
          msg: "Error in uploaded data",
        })
      : res.status(200).json({
          status: "success",
          msg: "Cart added successfully",
        });
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const idFound = await cartManager.getCartId(cid);

    idFound === `Failed to get Cart, Cart ${cid} was not found`
      ? res.status(404).json({
          status: "error",
          msg: idFound,
        })
      : res.status(200).json({
          status: "success",
          msg: "Displaying product",
          data: idFound,
        });
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    let { cid, pid } = req.params;
    const addProductToCart = await cartManager.addProductsToCarts(cid, pid);
    if (
      addProductToCart === "Cart does not exist" ||
      addProductToCart === "Product does not exist"
    ) {
      return res.status(404).json({
        status: "error",
        msg: addProductToCart,
      });
    } else {
      res.status(200).json({
        status: "success",
        msg: "Producto agregado con exito",
        data: addProductToCart,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cartDelete = await cartManager.deleteCartById(cid);

    if (cartDelete === "Cart not found") {
      return res.status(404).json({
        status: "error",
        msg: cartDelete,
      });
    } else {
      res.status(200).json({
        status: "success",
        msg: cartDelete,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

cartsRouter.delete('/:cartId/products/:productId', async (request, response) => {
  const { cartId, productId } = request.params;
  const cart = await cartManager.deleteProductInCart(cartId, productId);
  if (cart) {
      response.json({ message: 'El producto se ha eliminado del carrito exitosamente.', cart: cart })
  } else {
      response.json({ message: 'El producto no ha podido ser eliminado al carrito.' })
  }
});
cartsRouter.put('/:cartId', async (request, response) => {
  const { cartId } = request.params;
  const products = request.body;
  const cart = await cartManager.replaceProductsInCart(cartId, products);
  if (cart) {
      response.json({ message: 'Se han actualizado los productos del carrito exitosamente.', cart: cart })
  } else {
      response.json({ message: 'No se han podido actualizar los productos del carrito.' })
  }
});

cartsRouter.put('/:cartId/products/:productId', async (request, response) => {
  const { cartId, productId } = request.params;
  const { quantity } = request.body;
  const cart = await cartManager.updateProductInCart(cartId, productId, quantity);
  if (cart) {
      response.json({ message: 'Se ha actualizado la cantidad del producto en el carrito exitosamente.', cart: cart })
  } else {
      response.json({ message: 'No se ha podido actualizar la cantidad del producto en el carrito.' })
  }
});


module.exports = {
  cartsRouter,
};


