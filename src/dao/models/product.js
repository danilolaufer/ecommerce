const mongoose = require("mongoose")
const mongoosePaginate =require('mongoose-paginate-v2') 
const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true, },
    category: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100, unique: true },
    stock: { type: Number, required: true},
    thumbnail: { type: [String], required: false },
})
ProductSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("products", ProductSchema)




module.exports={
    ProductModel
}

