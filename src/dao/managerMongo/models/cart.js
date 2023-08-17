const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});
CartSchema.pre("find", function(){
    this.populate({ path:'products.product'})
})

const CartModel = mongoose.model("Cart", CartSchema)
module.exports = CartModel
