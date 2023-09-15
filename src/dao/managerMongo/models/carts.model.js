const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
    products: [{
         idProduct: { type: mongoose.Schema.Types.ObjectId,
             ref: 'products' },
         quantity: { type: Number }, 
         _id: false }] },
 { versionKey: false });

const CartModel = mongoose.model("carts", schema);

module.exports = { CartModel };
