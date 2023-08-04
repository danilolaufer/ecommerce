const { Router } = require('express');
const { ProductManager } = require('../controllers/productManager.js')
//------------- comentarlo porque ahora se trabaja con Mongo
const productManager = new ProductManager('src/db/products.json');
const { ProductManagerMongo } = require('../dao/managerMongo/productManager')//importar manager de mongo
// const productManager = new ProductManagerMongo()

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
  const data = await productManager.getProducts();
  console.log(data)
  res.render('home', { data, style: 'index.css' });
});

module.exports = {
  homeRouter,
};
