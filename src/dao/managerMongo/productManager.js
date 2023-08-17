
const express= require("express")
const {ProductModel} = require('./models/product')


class ProductManagerMongo{

  async getProducts(queryParams) {
    try {
      const { limit = 10, page = 1, sort, query } = queryParams;
      const filter = {};
    
      if (query) {
        filter.$or = [{ category: query }, { availability: query }];
      }
    
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: sort === 'desc' ? '-price' : 'price',
      };
    
      const result = await ProductModel.paginate(filter, options);
    
      const response = {
        status: 'success',
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.hasPrevPage ? result.prevPage : null,
        nextPage: result.hasNextPage ? result.nextPage : null,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
          ? `/api/products?limit=${limit}&page=${result.prevPage}`
          : null,
        nextLink: result.hasNextPage
          ? `/api/products?limit=${limit}&page=${result.nextPage}`
          : null,
      };
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const productById = await ProductModel.findById(id)
      
      return productById ? productById :"Product not found"
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(product) {
    try {
      const { title, description, code, price, stock, category, thumbnails, status } = product;
      if (!title || !description || !code || !price || !stock || !category) {
        return "All fields are required";
      }
      const productCreated = await ProductModel.create({
        title,
        description,
        price,
        code,
        stock,
        category,
        thumbnails,
         status
      });
      return 'Product added successfully';
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, product) {
    try {
      const { title, description, price, code, stock, category }=product
      const productUptaded = await ProductModel.updateOne(
        { _id: id },
        { title, description, price, code, stock, category }
      );
      return 'Product updated successfully';
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(_id) {
    try {
      const deleted = await ProductModel.deleteOne({ _id });
      if (deleted.deletedCount === 1) {
        return 'Product deleted successfully';
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  ProductManagerMongo,
}
