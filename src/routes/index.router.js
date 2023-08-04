const { Router } = require('express');
const { cartsRouter } = require('./cart.route');
const { productRouter } = require('./product.route');

const indexRouter = Router();

indexRouter.use('/carts', cartsRouter);
indexRouter.use('/products', productRouter);

module.exports = {
  indexRouter,
};


