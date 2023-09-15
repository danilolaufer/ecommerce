const { CartModel } = require("../models/carts.model.js");

class CartClass {

    async find() {
        let carts = await CartModel.find({})
        return carts
    }
    async create(cart) {
        let newCart = await CartModel.create(cart)
        return newCart
    }
    async findPopulatedOne(id) {
        let cart = await CartModel.findOne({ _id: id }).populate('products.idProduct')
        return cart
    }
    async updateOne(id) {
        await CartModel.updateOne({ _id: id }, { products: [] });
    }
    async updateProducts(id, products) {
        await CartModel.updateOne({ _id: id }, { products });
    }
    async findOne(id) {
        let cart = await CartModel.findOne({ _id: id });
        return cart;
    }
}

module.exports = { cartModel: new CartClass };
