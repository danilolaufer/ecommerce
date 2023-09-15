const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true, max: 100000000 },
    thumbnail: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100, unique: true },
    stock: { type: Number, required: true, max: 200000000 },
    status: { type: Boolean },
    category: { type: String, required: true, max: 100 }
}, { versionKey: false });

schema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("products", schema);

module.exports = { ProductModel };
