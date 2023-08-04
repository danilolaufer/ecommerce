const { Router } = require('express');
const { ProductManager } = require('../controllers/productManager');//Corregir importacion
const { ProductManagerMongo } = require('../dao/managerMongo/productManager')//importar manager de mongo

const productRouter = Router();

const productManager = new ProductManagerMongo();
//Comentar el manager de fs porque usas el de mongo
// const productManager = new ProductManager("src/db/products.json");

productRouter.get('/', async (req, res) => {
  try {
    const query = req.query;//Agregar las query 
    const getProducts = await productManager.getProducts(query);
    getProducts
      ? res.status(200).json({
          status: 'success',
          msg: 'Displaying all products',
          data: getProducts,
        })
      : res.status(404).json({
          status: 'error',
          msg: 'Error Displaying all products',
          data: getProducts,
        });
  } catch (error) {
    console.log(error);
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await productManager.getProductById(id);
    console.log(productById);
    productById === 'Product not found'
      ? res.status(404).json({
          status: 'error',
          msg: productById,
        })
      : res.status(200).json({
          status: 'success',
          msg: 'Product found',
          data: productById,
        });
  } catch (error) {
    console.log(error);
  }
});

productRouter.post('/', async (req, res) => {
  try {
    const product = req.body;
    const productAdd = await productManager.addProduct(product);
    productAdd === 'Product added successfully'
      ? res.status(200).json({
          status: 'success',
          msg: productAdd,
        })
      : res.status(404).json({
          status: 'error',
          msg: productAdd,
        });
  } catch (error) {
    console.log(error);
  }
});

productRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;
    const productUpdated = await productManager.updateProduct(id, product);
    productUpdated === 'Product updated successfully'
      ? res.status(200).json({
          status: 'success',
          msg: productUpdated,
        })
      : res.status(404).json({
          status: 'error',
          msg: productUpdated,
        });
  } catch (error) {
    console.log(error);
  }
});
productRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productDeleted = await productManager.deleteProduct(id);
    productDeleted === 'Product deleted successfully'
      ? res.status(200).json({
          status: 'success',
          msg: productDeleted,
        })
      : res.status(404).json({
          status: 'error',
          msg: productDeleted,
        });
  } catch (error) {
    console.log(error);
  }
});

//Exportar productRouter
module.exports = {
  productRouter,
};
