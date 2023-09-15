const express = require('express');
const { productController } = require('../controllers/products.controller.js');

const productsRouter = express.Router();

productsRouter.get("/", productController.getWithQuerys);
productsRouter.get("/:id", productController.getProductById);
productsRouter.post("/", productController.addProduct);
productsRouter.delete("/:id", productController.delete);
productsRouter.put("/:id", productController.updateProduct);

module.exports = productsRouter;
